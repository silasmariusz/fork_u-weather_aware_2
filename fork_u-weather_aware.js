(function(){"use strict";var Rt=typeof document<"u"?document.currentScript:null;const na={enabled:!0,weather_entity:"weather.openweathermap",development_mode:!1,test_effect:"Use Real Weather",sun_entity:"sun.sun",moon_phase_entity:null,uv_index_entity:null,moon_position_entity:null,moon_azimuth_entity:null,moon_altitude_entity:null,moon_distance_entity:null,gaming_mode_entity:null,pm25_entity:null,pm4_entity:null,pm10_entity:null,smog_threshold_pm25:35,smog_threshold_pm4:50,smog_threshold_pm10:50,cloud_coverage_entity:null,wind_speed_entity:null,wind_direction_entity:null,precipitation_entity:null,lightning_counter_entity:null,lightning_distance_entity:null,debug_precipitation:null,debug_wind_speed:null,debug_wind_direction:null,debug_lightning_distance:null,debug_lightning_counter:null,debug_cloud_coverage:null,cloud_speed_multiplier:1,rain_max_tilt_deg:30,rain_wind_min_kmh:3,theme_mode:null,drizzle_precipitation_max:2.5,speed_factor_rain:1,speed_factor_snow:1,speed_factor_clouds:1,speed_factor_fog:1,speed_factor_smog:1,speed_factor_hail:1,speed_factor_lightning:1,speed_factor_stars:1,speed_factor_matrix:1,wind_sway_factor:.7,spatial_mode:"foreground",enable_rain:!0,enable_snow:!0,enable_clouds:!0,enable_fog:!0,enable_smog_effect:!0,enable_sun_glow:!0,enable_moon_glow:!0,enable_stars:!0,enable_hail:!0,enable_lightning_effect:!0,enable_matrix:!0,enable_window_droplets:!0,stars_require_moon:!1,mobile_limit_dpr:!0,mobile_reduce_particles:!0,mobile_snowy2_light:!0,mobile_smog_simple:!1,mobile_30fps:!1,gaming_matrix_only:!1};window.ForkUWeatherAwareConfig=Object.assign({},na,window.ForkUWeatherAwareConfig||{}),window.ForkUWeatherAwareDefaultConfig=na;try{console.log("%cFork U – Weather Aware%c Three.js overlay · spatial, theme & mobile aware","background:#ffcc00;color:#000;font-weight:bold;padding:2px 6px;border-radius:3px 0 0 3px;","background:#1e1e1e;color:#fff;padding:2px 6px;border-radius:0 3px 3px 0;")}catch{}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const wr="170",dl=0,ia=1,ul=2,ra=1,hl=2,Jt=3,un=0,St=1,jt=2,hn=0,Xt=1,Yt=2,sa=3,aa=4,fl=5,wn=100,pl=101,ml=102,_l=103,gl=104,vl=200,xl=201,yl=202,Ml=203,br=204,Tr=205,Sl=206,El=207,wl=208,bl=209,Tl=210,Al=211,Cl=212,Rl=213,Il=214,Ar=0,Cr=1,Rr=2,kn=3,Ir=4,Pr=5,Ur=6,Dr=7,oa=0,Pl=1,Ul=2,fn=0,Dl=1,Ll=2,Nl=3,Fl=4,Ol=5,Bl=6,zl=7,la=300,Hn=301,Gn=302,Lr=303,Nr=304,Fi=306,Fr=1e3,bn=1001,Or=1002,Ft=1003,kl=1004,Oi=1005,ft=1006,Br=1007,Tn=1008,$t=1009,ca=1010,da=1011,gi=1012,zr=1013,An=1014,Qt=1015,vi=1016,kr=1017,Hr=1018,Vn=1020,ua=35902,ha=1021,fa=1022,It=1023,pa=1024,ma=1025,Wn=1026,Xn=1027,_a=1028,Gr=1029,ga=1030,Vr=1031,Wr=1033,Bi=33776,zi=33777,ki=33778,Hi=33779,Xr=35840,Yr=35841,$r=35842,qr=35843,Zr=36196,Kr=37492,Jr=37496,jr=37808,Qr=37809,es=37810,ts=37811,ns=37812,is=37813,rs=37814,ss=37815,as=37816,os=37817,ls=37818,cs=37819,ds=37820,us=37821,Gi=36492,hs=36494,fs=36495,va=36283,ps=36284,ms=36285,_s=36286,Hl=3200,Gl=3201,Vl=0,Wl=1,pn="",Pt="srgb",Yn="srgb-linear",Vi="linear",Ye="srgb",$n=7680,xa=519,Xl=512,Yl=513,$l=514,ya=515,ql=516,Zl=517,Kl=518,Jl=519,Ma=35044,Sa="300 es",en=2e3,Wi=2001;class qn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const a=r.indexOf(t);a!==-1&&r.splice(a,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let a=0,s=r.length;a<s;a++)r[a].call(this,e);e.target=null}}}const pt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ea=1234567;const xi=Math.PI/180,yi=180/Math.PI;function Zn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(pt[i&255]+pt[i>>8&255]+pt[i>>16&255]+pt[i>>24&255]+"-"+pt[e&255]+pt[e>>8&255]+"-"+pt[e>>16&15|64]+pt[e>>24&255]+"-"+pt[t&63|128]+pt[t>>8&255]+"-"+pt[t>>16&255]+pt[t>>24&255]+pt[n&255]+pt[n>>8&255]+pt[n>>16&255]+pt[n>>24&255]).toLowerCase()}function vt(i,e,t){return Math.max(e,Math.min(t,i))}function gs(i,e){return(i%e+e)%e}function jl(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function Ql(i,e,t){return i!==e?(t-i)/(e-i):0}function Mi(i,e,t){return(1-t)*i+t*e}function ec(i,e,t,n){return Mi(i,e,1-Math.exp(-t*n))}function tc(i,e=1){return e-Math.abs(gs(i,e*2)-e)}function nc(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function ic(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function rc(i,e){return i+Math.floor(Math.random()*(e-i+1))}function sc(i,e){return i+Math.random()*(e-i)}function ac(i){return i*(.5-Math.random())}function oc(i){i!==void 0&&(Ea=i);let e=Ea+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function lc(i){return i*xi}function cc(i){return i*yi}function dc(i){return(i&i-1)===0&&i!==0}function uc(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function hc(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function fc(i,e,t,n,r){const a=Math.cos,s=Math.sin,o=a(t/2),l=s(t/2),c=a((e+n)/2),d=s((e+n)/2),u=a((e-n)/2),f=s((e-n)/2),h=a((n-e)/2),_=s((n-e)/2);switch(r){case"XYX":i.set(o*d,l*u,l*f,o*c);break;case"YZY":i.set(l*f,o*d,l*u,o*c);break;case"ZXZ":i.set(l*u,l*f,o*d,o*c);break;case"XZX":i.set(o*d,l*_,l*h,o*c);break;case"YXY":i.set(l*h,o*d,l*_,o*c);break;case"ZYZ":i.set(l*_,l*h,o*d,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Kn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function xt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const qe={DEG2RAD:xi,RAD2DEG:yi,generateUUID:Zn,clamp:vt,euclideanModulo:gs,mapLinear:jl,inverseLerp:Ql,lerp:Mi,damp:ec,pingpong:tc,smoothstep:nc,smootherstep:ic,randInt:rc,randFloat:sc,randFloatSpread:ac,seededRandom:oc,degToRad:lc,radToDeg:cc,isPowerOfTwo:dc,ceilPowerOfTwo:uc,floorPowerOfTwo:hc,setQuaternionFromProperEuler:fc,normalize:xt,denormalize:Kn};class Ue{constructor(e=0,t=0){Ue.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(vt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),a=this.x-e.x,s=this.y-e.y;return this.x=a*n-s*r+e.x,this.y=a*r+s*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ae{constructor(e,t,n,r,a,s,o,l,c){Ae.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,a,s,o,l,c)}set(e,t,n,r,a,s,o,l,c){const d=this.elements;return d[0]=e,d[1]=r,d[2]=o,d[3]=t,d[4]=a,d[5]=l,d[6]=n,d[7]=s,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,a=this.elements,s=n[0],o=n[3],l=n[6],c=n[1],d=n[4],u=n[7],f=n[2],h=n[5],_=n[8],v=r[0],m=r[3],p=r[6],b=r[1],w=r[4],y=r[7],L=r[2],T=r[5],A=r[8];return a[0]=s*v+o*b+l*L,a[3]=s*m+o*w+l*T,a[6]=s*p+o*y+l*A,a[1]=c*v+d*b+u*L,a[4]=c*m+d*w+u*T,a[7]=c*p+d*y+u*A,a[2]=f*v+h*b+_*L,a[5]=f*m+h*w+_*T,a[8]=f*p+h*y+_*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],s=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*s*d-t*o*c-n*a*d+n*o*l+r*a*c-r*s*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],s=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=d*s-o*c,f=o*l-d*a,h=c*a-s*l,_=t*u+n*f+r*h;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/_;return e[0]=u*v,e[1]=(r*c-d*n)*v,e[2]=(o*n-r*s)*v,e[3]=f*v,e[4]=(d*t-r*l)*v,e[5]=(r*a-o*t)*v,e[6]=h*v,e[7]=(n*l-c*t)*v,e[8]=(s*t-n*a)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,a,s,o){const l=Math.cos(a),c=Math.sin(a);return this.set(n*l,n*c,-n*(l*s+c*o)+s+e,-r*c,r*l,-r*(-c*s+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(vs.makeScale(e,t)),this}rotate(e){return this.premultiply(vs.makeRotation(-e)),this}translate(e,t){return this.premultiply(vs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const vs=new Ae;function wa(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Xi(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function pc(){const i=Xi("canvas");return i.style.display="block",i}const ba={};function Si(i){i in ba||(ba[i]=!0,console.warn(i))}function mc(i,e,t){return new Promise(function(n,r){function a(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:n()}}setTimeout(a,t)})}function _c(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function gc(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Be={enabled:!0,workingColorSpace:Yn,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===Ye&&(i.r=tn(i.r),i.g=tn(i.g),i.b=tn(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===Ye&&(i.r=Jn(i.r),i.g=Jn(i.g),i.b=Jn(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===pn?Vi:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function tn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Jn(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Ta=[.64,.33,.3,.6,.15,.06],Aa=[.2126,.7152,.0722],Ca=[.3127,.329],Ra=new Ae().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ia=new Ae().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Be.define({[Yn]:{primaries:Ta,whitePoint:Ca,transfer:Vi,toXYZ:Ra,fromXYZ:Ia,luminanceCoefficients:Aa,workingColorSpaceConfig:{unpackColorSpace:Pt},outputColorSpaceConfig:{drawingBufferColorSpace:Pt}},[Pt]:{primaries:Ta,whitePoint:Ca,transfer:Ye,toXYZ:Ra,fromXYZ:Ia,luminanceCoefficients:Aa,outputColorSpaceConfig:{drawingBufferColorSpace:Pt}}});let jn;class vc{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{jn===void 0&&(jn=Xi("canvas")),jn.width=e.width,jn.height=e.height;const n=jn.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=jn}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Xi("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),a=r.data;for(let s=0;s<a.length;s++)a[s]=tn(a[s]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(tn(t[n]/255)*255):t[n]=tn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let xc=0;class Pa{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:xc++}),this.uuid=Zn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let s=0,o=r.length;s<o;s++)r[s].isDataTexture?a.push(xs(r[s].image)):a.push(xs(r[s]))}else a=xs(r);n.url=a}return t||(e.images[this.uuid]=n),n}}function xs(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?vc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let yc=0;class yt extends qn{constructor(e=yt.DEFAULT_IMAGE,t=yt.DEFAULT_MAPPING,n=bn,r=bn,a=ft,s=Tn,o=It,l=$t,c=yt.DEFAULT_ANISOTROPY,d=pn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:yc++}),this.uuid=Zn(),this.name="",this.source=new Pa(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=a,this.minFilter=s,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ue(0,0),this.repeat=new Ue(1,1),this.center=new Ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ae,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==la)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Fr:e.x=e.x-Math.floor(e.x);break;case bn:e.x=e.x<0?0:1;break;case Or:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Fr:e.y=e.y-Math.floor(e.y);break;case bn:e.y=e.y<0?0:1;break;case Or:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}yt.DEFAULT_IMAGE=null,yt.DEFAULT_MAPPING=la,yt.DEFAULT_ANISOTROPY=1;class it{constructor(e=0,t=0,n=0,r=1){it.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,a=this.w,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r+s[12]*a,this.y=s[1]*t+s[5]*n+s[9]*r+s[13]*a,this.z=s[2]*t+s[6]*n+s[10]*r+s[14]*a,this.w=s[3]*t+s[7]*n+s[11]*r+s[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,a;const l=e.elements,c=l[0],d=l[4],u=l[8],f=l[1],h=l[5],_=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(d-f)<.01&&Math.abs(u-v)<.01&&Math.abs(_-m)<.01){if(Math.abs(d+f)<.1&&Math.abs(u+v)<.1&&Math.abs(_+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(c+1)/2,y=(h+1)/2,L=(p+1)/2,T=(d+f)/4,A=(u+v)/4,D=(_+m)/4;return w>y&&w>L?w<.01?(n=0,r=.707106781,a=.707106781):(n=Math.sqrt(w),r=T/n,a=A/n):y>L?y<.01?(n=.707106781,r=0,a=.707106781):(r=Math.sqrt(y),n=T/r,a=D/r):L<.01?(n=.707106781,r=.707106781,a=0):(a=Math.sqrt(L),n=A/a,r=D/a),this.set(n,r,a,t),this}let b=Math.sqrt((m-_)*(m-_)+(u-v)*(u-v)+(f-d)*(f-d));return Math.abs(b)<.001&&(b=1),this.x=(m-_)/b,this.y=(u-v)/b,this.z=(f-d)/b,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Mc extends qn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new it(0,0,e,t),this.scissorTest=!1,this.viewport=new it(0,0,e,t);const r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ft,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const a=new yt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);a.flipY=!1,a.generateMipmaps=n.generateMipmaps,a.internalFormat=n.internalFormat,this.textures=[];const s=n.count;for(let o=0;o<s;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Pa(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class mn extends Mc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Ua extends yt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Sc extends yt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ei{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,a,s,o){let l=n[r+0],c=n[r+1],d=n[r+2],u=n[r+3];const f=a[s+0],h=a[s+1],_=a[s+2],v=a[s+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u;return}if(o===1){e[t+0]=f,e[t+1]=h,e[t+2]=_,e[t+3]=v;return}if(u!==v||l!==f||c!==h||d!==_){let m=1-o;const p=l*f+c*h+d*_+u*v,b=p>=0?1:-1,w=1-p*p;if(w>Number.EPSILON){const L=Math.sqrt(w),T=Math.atan2(L,p*b);m=Math.sin(m*T)/L,o=Math.sin(o*T)/L}const y=o*b;if(l=l*m+f*y,c=c*m+h*y,d=d*m+_*y,u=u*m+v*y,m===1-o){const L=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=L,c*=L,d*=L,u*=L}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,a,s){const o=n[r],l=n[r+1],c=n[r+2],d=n[r+3],u=a[s],f=a[s+1],h=a[s+2],_=a[s+3];return e[t]=o*_+d*u+l*h-c*f,e[t+1]=l*_+d*f+c*u-o*h,e[t+2]=c*_+d*h+o*f-l*u,e[t+3]=d*_-o*u-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,a=e._z,s=e._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(r/2),u=o(a/2),f=l(n/2),h=l(r/2),_=l(a/2);switch(s){case"XYZ":this._x=f*d*u+c*h*_,this._y=c*h*u-f*d*_,this._z=c*d*_+f*h*u,this._w=c*d*u-f*h*_;break;case"YXZ":this._x=f*d*u+c*h*_,this._y=c*h*u-f*d*_,this._z=c*d*_-f*h*u,this._w=c*d*u+f*h*_;break;case"ZXY":this._x=f*d*u-c*h*_,this._y=c*h*u+f*d*_,this._z=c*d*_+f*h*u,this._w=c*d*u-f*h*_;break;case"ZYX":this._x=f*d*u-c*h*_,this._y=c*h*u+f*d*_,this._z=c*d*_-f*h*u,this._w=c*d*u+f*h*_;break;case"YZX":this._x=f*d*u+c*h*_,this._y=c*h*u+f*d*_,this._z=c*d*_-f*h*u,this._w=c*d*u-f*h*_;break;case"XZY":this._x=f*d*u-c*h*_,this._y=c*h*u-f*d*_,this._z=c*d*_+f*h*u,this._w=c*d*u+f*h*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],a=t[8],s=t[1],o=t[5],l=t[9],c=t[2],d=t[6],u=t[10],f=n+o+u;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(d-l)*h,this._y=(a-c)*h,this._z=(s-r)*h}else if(n>o&&n>u){const h=2*Math.sqrt(1+n-o-u);this._w=(d-l)/h,this._x=.25*h,this._y=(r+s)/h,this._z=(a+c)/h}else if(o>u){const h=2*Math.sqrt(1+o-n-u);this._w=(a-c)/h,this._x=(r+s)/h,this._y=.25*h,this._z=(l+d)/h}else{const h=2*Math.sqrt(1+u-n-o);this._w=(s-r)/h,this._x=(a+c)/h,this._y=(l+d)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(vt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,a=e._z,s=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+s*o+r*c-a*l,this._y=r*d+s*l+a*o-n*c,this._z=a*d+s*c+n*l-r*o,this._w=s*d-n*o-r*l-a*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,a=this._z,s=this._w;let o=s*e._w+n*e._x+r*e._y+a*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=s,this._x=n,this._y=r,this._z=a,this;const l=1-o*o;if(l<=Number.EPSILON){const h=1-t;return this._w=h*s+t*this._w,this._x=h*n+t*this._x,this._y=h*r+t*this._y,this._z=h*a+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),u=Math.sin((1-t)*d)/c,f=Math.sin(t*d)/c;return this._w=s*u+this._w*f,this._x=n*u+this._x*f,this._y=r*u+this._y*f,this._z=a*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),a=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class B{constructor(e=0,t=0,n=0){B.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Da.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Da.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*n+a[6]*r,this.y=a[1]*t+a[4]*n+a[7]*r,this.z=a[2]*t+a[5]*n+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,a=e.elements,s=1/(a[3]*t+a[7]*n+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*n+a[8]*r+a[12])*s,this.y=(a[1]*t+a[5]*n+a[9]*r+a[13])*s,this.z=(a[2]*t+a[6]*n+a[10]*r+a[14])*s,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,a=e.x,s=e.y,o=e.z,l=e.w,c=2*(s*r-o*n),d=2*(o*t-a*r),u=2*(a*n-s*t);return this.x=t+l*c+s*u-o*d,this.y=n+l*d+o*c-a*u,this.z=r+l*u+a*d-s*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r,this.y=a[1]*t+a[5]*n+a[9]*r,this.z=a[2]*t+a[6]*n+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,a=e.z,s=t.x,o=t.y,l=t.z;return this.x=r*l-a*o,this.y=a*s-n*l,this.z=n*o-r*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ys.copy(this).projectOnVector(e),this.sub(ys)}reflect(e){return this.sub(ys.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(vt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ys=new B,Da=new Ei;class wi{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ot.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ot.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Ot.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const a=n.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let s=0,o=a.count;s<o;s++)e.isMesh===!0?e.getVertexPosition(s,Ot):Ot.fromBufferAttribute(a,s),Ot.applyMatrix4(e.matrixWorld),this.expandByPoint(Ot);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Yi.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Yi.copy(n.boundingBox)),Yi.applyMatrix4(e.matrixWorld),this.union(Yi)}const r=e.children;for(let a=0,s=r.length;a<s;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ot),Ot.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(bi),$i.subVectors(this.max,bi),Qn.subVectors(e.a,bi),ei.subVectors(e.b,bi),ti.subVectors(e.c,bi),_n.subVectors(ei,Qn),gn.subVectors(ti,ei),Cn.subVectors(Qn,ti);let t=[0,-_n.z,_n.y,0,-gn.z,gn.y,0,-Cn.z,Cn.y,_n.z,0,-_n.x,gn.z,0,-gn.x,Cn.z,0,-Cn.x,-_n.y,_n.x,0,-gn.y,gn.x,0,-Cn.y,Cn.x,0];return!Ms(t,Qn,ei,ti,$i)||(t=[1,0,0,0,1,0,0,0,1],!Ms(t,Qn,ei,ti,$i))?!1:(qi.crossVectors(_n,gn),t=[qi.x,qi.y,qi.z],Ms(t,Qn,ei,ti,$i))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ot).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ot).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(nn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const nn=[new B,new B,new B,new B,new B,new B,new B,new B],Ot=new B,Yi=new wi,Qn=new B,ei=new B,ti=new B,_n=new B,gn=new B,Cn=new B,bi=new B,$i=new B,qi=new B,Rn=new B;function Ms(i,e,t,n,r){for(let a=0,s=i.length-3;a<=s;a+=3){Rn.fromArray(i,a);const o=r.x*Math.abs(Rn.x)+r.y*Math.abs(Rn.y)+r.z*Math.abs(Rn.z),l=e.dot(Rn),c=t.dot(Rn),d=n.dot(Rn);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const Ec=new wi,Ti=new B,Ss=new B;class Zi{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Ec.setFromPoints(e).getCenter(n);let r=0;for(let a=0,s=e.length;a<s;a++)r=Math.max(r,n.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ti.subVectors(e,this.center);const t=Ti.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Ti,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ss.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ti.copy(e.center).add(Ss)),this.expandByPoint(Ti.copy(e.center).sub(Ss))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const rn=new B,Es=new B,Ki=new B,vn=new B,ws=new B,Ji=new B,bs=new B;class La{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,rn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=rn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(rn.copy(this.origin).addScaledVector(this.direction,t),rn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Es.copy(e).add(t).multiplyScalar(.5),Ki.copy(t).sub(e).normalize(),vn.copy(this.origin).sub(Es);const a=e.distanceTo(t)*.5,s=-this.direction.dot(Ki),o=vn.dot(this.direction),l=-vn.dot(Ki),c=vn.lengthSq(),d=Math.abs(1-s*s);let u,f,h,_;if(d>0)if(u=s*l-o,f=s*o-l,_=a*d,u>=0)if(f>=-_)if(f<=_){const v=1/d;u*=v,f*=v,h=u*(u+s*f+2*o)+f*(s*u+f+2*l)+c}else f=a,u=Math.max(0,-(s*f+o)),h=-u*u+f*(f+2*l)+c;else f=-a,u=Math.max(0,-(s*f+o)),h=-u*u+f*(f+2*l)+c;else f<=-_?(u=Math.max(0,-(-s*a+o)),f=u>0?-a:Math.min(Math.max(-a,-l),a),h=-u*u+f*(f+2*l)+c):f<=_?(u=0,f=Math.min(Math.max(-a,-l),a),h=f*(f+2*l)+c):(u=Math.max(0,-(s*a+o)),f=u>0?a:Math.min(Math.max(-a,-l),a),h=-u*u+f*(f+2*l)+c);else f=s>0?-a:a,u=Math.max(0,-(s*f+o)),h=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Es).addScaledVector(Ki,f),h}intersectSphere(e,t){rn.subVectors(e.center,this.origin);const n=rn.dot(this.direction),r=rn.dot(rn)-n*n,a=e.radius*e.radius;if(r>a)return null;const s=Math.sqrt(a-r),o=n-s,l=n+s;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,a,s,o,l;const c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),d>=0?(a=(e.min.y-f.y)*d,s=(e.max.y-f.y)*d):(a=(e.max.y-f.y)*d,s=(e.min.y-f.y)*d),n>s||a>r||((a>n||isNaN(n))&&(n=a),(s<r||isNaN(r))&&(r=s),u>=0?(o=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(o=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,rn)!==null}intersectTriangle(e,t,n,r,a){ws.subVectors(t,e),Ji.subVectors(n,e),bs.crossVectors(ws,Ji);let s=this.direction.dot(bs),o;if(s>0){if(r)return null;o=1}else if(s<0)o=-1,s=-s;else return null;vn.subVectors(this.origin,e);const l=o*this.direction.dot(Ji.crossVectors(vn,Ji));if(l<0)return null;const c=o*this.direction.dot(ws.cross(vn));if(c<0||l+c>s)return null;const d=-o*vn.dot(bs);return d<0?null:this.at(d/s,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class rt{constructor(e,t,n,r,a,s,o,l,c,d,u,f,h,_,v,m){rt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,a,s,o,l,c,d,u,f,h,_,v,m)}set(e,t,n,r,a,s,o,l,c,d,u,f,h,_,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=a,p[5]=s,p[9]=o,p[13]=l,p[2]=c,p[6]=d,p[10]=u,p[14]=f,p[3]=h,p[7]=_,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/ni.setFromMatrixColumn(e,0).length(),a=1/ni.setFromMatrixColumn(e,1).length(),s=1/ni.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=0,t[8]=n[8]*s,t[9]=n[9]*s,t[10]=n[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,a=e.z,s=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),d=Math.cos(a),u=Math.sin(a);if(e.order==="XYZ"){const f=s*d,h=s*u,_=o*d,v=o*u;t[0]=l*d,t[4]=-l*u,t[8]=c,t[1]=h+_*c,t[5]=f-v*c,t[9]=-o*l,t[2]=v-f*c,t[6]=_+h*c,t[10]=s*l}else if(e.order==="YXZ"){const f=l*d,h=l*u,_=c*d,v=c*u;t[0]=f+v*o,t[4]=_*o-h,t[8]=s*c,t[1]=s*u,t[5]=s*d,t[9]=-o,t[2]=h*o-_,t[6]=v+f*o,t[10]=s*l}else if(e.order==="ZXY"){const f=l*d,h=l*u,_=c*d,v=c*u;t[0]=f-v*o,t[4]=-s*u,t[8]=_+h*o,t[1]=h+_*o,t[5]=s*d,t[9]=v-f*o,t[2]=-s*c,t[6]=o,t[10]=s*l}else if(e.order==="ZYX"){const f=s*d,h=s*u,_=o*d,v=o*u;t[0]=l*d,t[4]=_*c-h,t[8]=f*c+v,t[1]=l*u,t[5]=v*c+f,t[9]=h*c-_,t[2]=-c,t[6]=o*l,t[10]=s*l}else if(e.order==="YZX"){const f=s*l,h=s*c,_=o*l,v=o*c;t[0]=l*d,t[4]=v-f*u,t[8]=_*u+h,t[1]=u,t[5]=s*d,t[9]=-o*d,t[2]=-c*d,t[6]=h*u+_,t[10]=f-v*u}else if(e.order==="XZY"){const f=s*l,h=s*c,_=o*l,v=o*c;t[0]=l*d,t[4]=-u,t[8]=c*d,t[1]=f*u+v,t[5]=s*d,t[9]=h*u-_,t[2]=_*u-h,t[6]=o*d,t[10]=v*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(wc,e,bc)}lookAt(e,t,n){const r=this.elements;return Tt.subVectors(e,t),Tt.lengthSq()===0&&(Tt.z=1),Tt.normalize(),xn.crossVectors(n,Tt),xn.lengthSq()===0&&(Math.abs(n.z)===1?Tt.x+=1e-4:Tt.z+=1e-4,Tt.normalize(),xn.crossVectors(n,Tt)),xn.normalize(),ji.crossVectors(Tt,xn),r[0]=xn.x,r[4]=ji.x,r[8]=Tt.x,r[1]=xn.y,r[5]=ji.y,r[9]=Tt.y,r[2]=xn.z,r[6]=ji.z,r[10]=Tt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,a=this.elements,s=n[0],o=n[4],l=n[8],c=n[12],d=n[1],u=n[5],f=n[9],h=n[13],_=n[2],v=n[6],m=n[10],p=n[14],b=n[3],w=n[7],y=n[11],L=n[15],T=r[0],A=r[4],D=r[8],S=r[12],M=r[1],C=r[5],Y=r[9],z=r[13],W=r[2],K=r[6],G=r[10],Q=r[14],H=r[3],ie=r[7],ce=r[11],xe=r[15];return a[0]=s*T+o*M+l*W+c*H,a[4]=s*A+o*C+l*K+c*ie,a[8]=s*D+o*Y+l*G+c*ce,a[12]=s*S+o*z+l*Q+c*xe,a[1]=d*T+u*M+f*W+h*H,a[5]=d*A+u*C+f*K+h*ie,a[9]=d*D+u*Y+f*G+h*ce,a[13]=d*S+u*z+f*Q+h*xe,a[2]=_*T+v*M+m*W+p*H,a[6]=_*A+v*C+m*K+p*ie,a[10]=_*D+v*Y+m*G+p*ce,a[14]=_*S+v*z+m*Q+p*xe,a[3]=b*T+w*M+y*W+L*H,a[7]=b*A+w*C+y*K+L*ie,a[11]=b*D+w*Y+y*G+L*ce,a[15]=b*S+w*z+y*Q+L*xe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],a=e[12],s=e[1],o=e[5],l=e[9],c=e[13],d=e[2],u=e[6],f=e[10],h=e[14],_=e[3],v=e[7],m=e[11],p=e[15];return _*(+a*l*u-r*c*u-a*o*f+n*c*f+r*o*h-n*l*h)+v*(+t*l*h-t*c*f+a*s*f-r*s*h+r*c*d-a*l*d)+m*(+t*c*u-t*o*h-a*s*u+n*s*h+a*o*d-n*c*d)+p*(-r*o*d-t*l*u+t*o*f+r*s*u-n*s*f+n*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],s=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=e[9],f=e[10],h=e[11],_=e[12],v=e[13],m=e[14],p=e[15],b=u*m*c-v*f*c+v*l*h-o*m*h-u*l*p+o*f*p,w=_*f*c-d*m*c-_*l*h+s*m*h+d*l*p-s*f*p,y=d*v*c-_*u*c+_*o*h-s*v*h-d*o*p+s*u*p,L=_*u*l-d*v*l-_*o*f+s*v*f+d*o*m-s*u*m,T=t*b+n*w+r*y+a*L;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/T;return e[0]=b*A,e[1]=(v*f*a-u*m*a-v*r*h+n*m*h+u*r*p-n*f*p)*A,e[2]=(o*m*a-v*l*a+v*r*c-n*m*c-o*r*p+n*l*p)*A,e[3]=(u*l*a-o*f*a-u*r*c+n*f*c+o*r*h-n*l*h)*A,e[4]=w*A,e[5]=(d*m*a-_*f*a+_*r*h-t*m*h-d*r*p+t*f*p)*A,e[6]=(_*l*a-s*m*a-_*r*c+t*m*c+s*r*p-t*l*p)*A,e[7]=(s*f*a-d*l*a+d*r*c-t*f*c-s*r*h+t*l*h)*A,e[8]=y*A,e[9]=(_*u*a-d*v*a-_*n*h+t*v*h+d*n*p-t*u*p)*A,e[10]=(s*v*a-_*o*a+_*n*c-t*v*c-s*n*p+t*o*p)*A,e[11]=(d*o*a-s*u*a-d*n*c+t*u*c+s*n*h-t*o*h)*A,e[12]=L*A,e[13]=(d*v*r-_*u*r+_*n*f-t*v*f-d*n*m+t*u*m)*A,e[14]=(_*o*r-s*v*r-_*n*l+t*v*l+s*n*m-t*o*m)*A,e[15]=(s*u*r-d*o*r+d*n*l-t*u*l-s*n*f+t*o*f)*A,this}scale(e){const t=this.elements,n=e.x,r=e.y,a=e.z;return t[0]*=n,t[4]*=r,t[8]*=a,t[1]*=n,t[5]*=r,t[9]*=a,t[2]*=n,t[6]*=r,t[10]*=a,t[3]*=n,t[7]*=r,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),a=1-n,s=e.x,o=e.y,l=e.z,c=a*s,d=a*o;return this.set(c*s+n,c*o-r*l,c*l+r*o,0,c*o+r*l,d*o+n,d*l-r*s,0,c*l-r*o,d*l+r*s,a*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,a,s){return this.set(1,n,a,0,e,1,s,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,a=t._x,s=t._y,o=t._z,l=t._w,c=a+a,d=s+s,u=o+o,f=a*c,h=a*d,_=a*u,v=s*d,m=s*u,p=o*u,b=l*c,w=l*d,y=l*u,L=n.x,T=n.y,A=n.z;return r[0]=(1-(v+p))*L,r[1]=(h+y)*L,r[2]=(_-w)*L,r[3]=0,r[4]=(h-y)*T,r[5]=(1-(f+p))*T,r[6]=(m+b)*T,r[7]=0,r[8]=(_+w)*A,r[9]=(m-b)*A,r[10]=(1-(f+v))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let a=ni.set(r[0],r[1],r[2]).length();const s=ni.set(r[4],r[5],r[6]).length(),o=ni.set(r[8],r[9],r[10]).length();this.determinant()<0&&(a=-a),e.x=r[12],e.y=r[13],e.z=r[14],Bt.copy(this);const c=1/a,d=1/s,u=1/o;return Bt.elements[0]*=c,Bt.elements[1]*=c,Bt.elements[2]*=c,Bt.elements[4]*=d,Bt.elements[5]*=d,Bt.elements[6]*=d,Bt.elements[8]*=u,Bt.elements[9]*=u,Bt.elements[10]*=u,t.setFromRotationMatrix(Bt),n.x=a,n.y=s,n.z=o,this}makePerspective(e,t,n,r,a,s,o=en){const l=this.elements,c=2*a/(t-e),d=2*a/(n-r),u=(t+e)/(t-e),f=(n+r)/(n-r);let h,_;if(o===en)h=-(s+a)/(s-a),_=-2*s*a/(s-a);else if(o===Wi)h=-s/(s-a),_=-s*a/(s-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=h,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,a,s,o=en){const l=this.elements,c=1/(t-e),d=1/(n-r),u=1/(s-a),f=(t+e)*c,h=(n+r)*d;let _,v;if(o===en)_=(s+a)*u,v=-2*u;else if(o===Wi)_=a*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-h,l[2]=0,l[6]=0,l[10]=v,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ni=new B,Bt=new rt,wc=new B(0,0,0),bc=new B(1,1,1),xn=new B,ji=new B,Tt=new B,Na=new rt,Fa=new Ei;class sn{constructor(e=0,t=0,n=0,r=sn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,a=r[0],s=r[4],o=r[8],l=r[1],c=r[5],d=r[9],u=r[2],f=r[6],h=r[10];switch(t){case"XYZ":this._y=Math.asin(vt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,h),this._z=Math.atan2(-s,a)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-vt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,a),this._z=0);break;case"ZXY":this._x=Math.asin(vt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,h),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-vt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(vt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,a)):(this._x=0,this._y=Math.atan2(o,h));break;case"XZY":this._z=Math.asin(-vt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-d,h),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Na.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Na,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Fa.setFromEuler(this),this.setFromQuaternion(Fa,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}sn.DEFAULT_ORDER="XYZ";class Oa{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Tc=0;const Ba=new B,ii=new Ei,an=new rt,Qi=new B,Ai=new B,Ac=new B,Cc=new Ei,za=new B(1,0,0),ka=new B(0,1,0),Ha=new B(0,0,1),Ga={type:"added"},Rc={type:"removed"},ri={type:"childadded",child:null},Ts={type:"childremoved",child:null};class Et extends qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Tc++}),this.uuid=Zn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Et.DEFAULT_UP.clone();const e=new B,t=new sn,n=new Ei,r=new B(1,1,1);function a(){n.setFromEuler(t,!1)}function s(){t.setFromQuaternion(n,void 0,!1)}t._onChange(a),n._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new rt},normalMatrix:{value:new Ae}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=Et.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Oa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ii.setFromAxisAngle(e,t),this.quaternion.multiply(ii),this}rotateOnWorldAxis(e,t){return ii.setFromAxisAngle(e,t),this.quaternion.premultiply(ii),this}rotateX(e){return this.rotateOnAxis(za,e)}rotateY(e){return this.rotateOnAxis(ka,e)}rotateZ(e){return this.rotateOnAxis(Ha,e)}translateOnAxis(e,t){return Ba.copy(e).applyQuaternion(this.quaternion),this.position.add(Ba.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(za,e)}translateY(e){return this.translateOnAxis(ka,e)}translateZ(e){return this.translateOnAxis(Ha,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(an.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Qi.copy(e):Qi.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Ai.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?an.lookAt(Ai,Qi,this.up):an.lookAt(Qi,Ai,this.up),this.quaternion.setFromRotationMatrix(an),r&&(an.extractRotation(r.matrixWorld),ii.setFromRotationMatrix(an),this.quaternion.premultiply(ii.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ga),ri.child=e,this.dispatchEvent(ri),ri.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Rc),Ts.child=e,this.dispatchEvent(Ts),Ts.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),an.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),an.multiply(e.parent.matrixWorld)),e.applyMatrix4(an),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ga),ri.child=e,this.dispatchEvent(ri),ri.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let a=0,s=r.length;a<s;a++)r[a].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ai,e,Ac),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ai,Cc,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let a=0,s=r.length;a<s;a++)r[a].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const u=l[c];a(e.shapes,u)}else a(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(e.materials,this.material[l]));r.material=o}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(a(e.animations,l))}}if(t){const o=s(e.geometries),l=s(e.materials),c=s(e.textures),d=s(e.images),u=s(e.shapes),f=s(e.skeletons),h=s(e.animations),_=s(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),_.length>0&&(n.nodes=_)}return n.object=r,n;function s(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}Et.DEFAULT_UP=new B(0,1,0),Et.DEFAULT_MATRIX_AUTO_UPDATE=!0,Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const zt=new B,on=new B,As=new B,ln=new B,si=new B,ai=new B,Va=new B,Cs=new B,Rs=new B,Is=new B,Ps=new it,Us=new it,Ds=new it;class kt{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),zt.subVectors(e,t),r.cross(zt);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,t,n,r,a){zt.subVectors(r,t),on.subVectors(n,t),As.subVectors(e,t);const s=zt.dot(zt),o=zt.dot(on),l=zt.dot(As),c=on.dot(on),d=on.dot(As),u=s*c-o*o;if(u===0)return a.set(0,0,0),null;const f=1/u,h=(c*l-o*d)*f,_=(s*d-o*l)*f;return a.set(1-h-_,_,h)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,ln)===null?!1:ln.x>=0&&ln.y>=0&&ln.x+ln.y<=1}static getInterpolation(e,t,n,r,a,s,o,l){return this.getBarycoord(e,t,n,r,ln)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,ln.x),l.addScaledVector(s,ln.y),l.addScaledVector(o,ln.z),l)}static getInterpolatedAttribute(e,t,n,r,a,s){return Ps.setScalar(0),Us.setScalar(0),Ds.setScalar(0),Ps.fromBufferAttribute(e,t),Us.fromBufferAttribute(e,n),Ds.fromBufferAttribute(e,r),s.setScalar(0),s.addScaledVector(Ps,a.x),s.addScaledVector(Us,a.y),s.addScaledVector(Ds,a.z),s}static isFrontFacing(e,t,n,r){return zt.subVectors(n,t),on.subVectors(e,t),zt.cross(on).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return zt.subVectors(this.c,this.b),on.subVectors(this.a,this.b),zt.cross(on).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return kt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return kt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,a){return kt.getInterpolation(e,this.a,this.b,this.c,t,n,r,a)}containsPoint(e){return kt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return kt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,a=this.c;let s,o;si.subVectors(r,n),ai.subVectors(a,n),Cs.subVectors(e,n);const l=si.dot(Cs),c=ai.dot(Cs);if(l<=0&&c<=0)return t.copy(n);Rs.subVectors(e,r);const d=si.dot(Rs),u=ai.dot(Rs);if(d>=0&&u<=d)return t.copy(r);const f=l*u-d*c;if(f<=0&&l>=0&&d<=0)return s=l/(l-d),t.copy(n).addScaledVector(si,s);Is.subVectors(e,a);const h=si.dot(Is),_=ai.dot(Is);if(_>=0&&h<=_)return t.copy(a);const v=h*c-l*_;if(v<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(n).addScaledVector(ai,o);const m=d*_-h*u;if(m<=0&&u-d>=0&&h-_>=0)return Va.subVectors(a,r),o=(u-d)/(u-d+(h-_)),t.copy(r).addScaledVector(Va,o);const p=1/(m+v+f);return s=v*p,o=f*p,t.copy(n).addScaledVector(si,s).addScaledVector(ai,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Wa={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yn={h:0,s:0,l:0},er={h:0,s:0,l:0};function Ls(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ge{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Pt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Be.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=Be.workingColorSpace){return this.r=e,this.g=t,this.b=n,Be.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=Be.workingColorSpace){if(e=gs(e,1),t=vt(t,0,1),n=vt(n,0,1),t===0)this.r=this.g=this.b=n;else{const a=n<=.5?n*(1+t):n+t-n*t,s=2*n-a;this.r=Ls(s,a,e+1/3),this.g=Ls(s,a,e),this.b=Ls(s,a,e-1/3)}return Be.toWorkingColorSpace(this,r),this}setStyle(e,t=Pt){function n(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const s=r[1],o=r[2];switch(s){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=r[1],s=a.length;if(s===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Pt){const n=Wa[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=tn(e.r),this.g=tn(e.g),this.b=tn(e.b),this}copyLinearToSRGB(e){return this.r=Jn(e.r),this.g=Jn(e.g),this.b=Jn(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Pt){return Be.fromWorkingColorSpace(mt.copy(this),e),Math.round(vt(mt.r*255,0,255))*65536+Math.round(vt(mt.g*255,0,255))*256+Math.round(vt(mt.b*255,0,255))}getHexString(e=Pt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Be.workingColorSpace){Be.fromWorkingColorSpace(mt.copy(this),t);const n=mt.r,r=mt.g,a=mt.b,s=Math.max(n,r,a),o=Math.min(n,r,a);let l,c;const d=(o+s)/2;if(o===s)l=0,c=0;else{const u=s-o;switch(c=d<=.5?u/(s+o):u/(2-s-o),s){case n:l=(r-a)/u+(r<a?6:0);break;case r:l=(a-n)/u+2;break;case a:l=(n-r)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=Be.workingColorSpace){return Be.fromWorkingColorSpace(mt.copy(this),t),e.r=mt.r,e.g=mt.g,e.b=mt.b,e}getStyle(e=Pt){Be.fromWorkingColorSpace(mt.copy(this),e);const t=mt.r,n=mt.g,r=mt.b;return e!==Pt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(yn),this.setHSL(yn.h+e,yn.s+t,yn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(yn),e.getHSL(er);const n=Mi(yn.h,er.h,t),r=Mi(yn.s,er.s,t),a=Mi(yn.l,er.l,t);return this.setHSL(n,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*n+a[6]*r,this.g=a[1]*t+a[4]*n+a[7]*r,this.b=a[2]*t+a[5]*n+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const mt=new Ge;Ge.NAMES=Wa;let Ic=0;class Ci extends qn{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ic++}),this.uuid=Zn(),this.name="",this.blending=Xt,this.side=un,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=br,this.blendDst=Tr,this.blendEquation=wn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ge(0,0,0),this.blendAlpha=0,this.depthFunc=kn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$n,this.stencilZFail=$n,this.stencilZPass=$n,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Xt&&(n.blending=this.blending),this.side!==un&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==br&&(n.blendSrc=this.blendSrc),this.blendDst!==Tr&&(n.blendDst=this.blendDst),this.blendEquation!==wn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==kn&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==xa&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==$n&&(n.stencilFail=this.stencilFail),this.stencilZFail!==$n&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==$n&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(a){const s=[];for(const o in a){const l=a[o];delete l.metadata,s.push(l)}return s}if(t){const a=r(e.textures),s=r(e.images);a.length>0&&(n.textures=a),s.length>0&&(n.images=s)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let a=0;a!==r;++a)n[a]=t[a].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ri extends Ci{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sn,this.combine=oa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ot=new B,tr=new Ue;class wt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ma,this.updateRanges=[],this.gpuType=Qt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)tr.fromBufferAttribute(this,t),tr.applyMatrix3(e),this.setXY(t,tr.x,tr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ot.fromBufferAttribute(this,t),ot.applyMatrix3(e),this.setXYZ(t,ot.x,ot.y,ot.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ot.fromBufferAttribute(this,t),ot.applyMatrix4(e),this.setXYZ(t,ot.x,ot.y,ot.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ot.fromBufferAttribute(this,t),ot.applyNormalMatrix(e),this.setXYZ(t,ot.x,ot.y,ot.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ot.fromBufferAttribute(this,t),ot.transformDirection(e),this.setXYZ(t,ot.x,ot.y,ot.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Kn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=xt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Kn(t,this.array)),t}setX(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Kn(t,this.array)),t}setY(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Kn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Kn(t,this.array)),t}setW(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array),r=xt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,a){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array),r=xt(r,this.array),a=xt(a,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ma&&(e.usage=this.usage),e}}class Xa extends wt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Ya extends wt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class In extends wt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Pc=0;const Ut=new rt,Ns=new Et,oi=new B,At=new wi,Ii=new wi,dt=new B;class Dt extends qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Pc++}),this.uuid=Zn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(wa(e)?Ya:Xa)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const a=new Ae().getNormalMatrix(e);n.applyNormalMatrix(a),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ut.makeRotationFromQuaternion(e),this.applyMatrix4(Ut),this}rotateX(e){return Ut.makeRotationX(e),this.applyMatrix4(Ut),this}rotateY(e){return Ut.makeRotationY(e),this.applyMatrix4(Ut),this}rotateZ(e){return Ut.makeRotationZ(e),this.applyMatrix4(Ut),this}translate(e,t,n){return Ut.makeTranslation(e,t,n),this.applyMatrix4(Ut),this}scale(e,t,n){return Ut.makeScale(e,t,n),this.applyMatrix4(Ut),this}lookAt(e){return Ns.lookAt(e),Ns.updateMatrix(),this.applyMatrix4(Ns.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(oi).negate(),this.translate(oi.x,oi.y,oi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,a=e.length;r<a;r++){const s=e[r];n.push(s.x,s.y,s.z||0)}this.setAttribute("position",new In(n,3))}else{for(let n=0,r=t.count;n<r;n++){const a=e[n];t.setXYZ(n,a.x,a.y,a.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new wi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const a=t[n];At.setFromBufferAttribute(a),this.morphTargetsRelative?(dt.addVectors(this.boundingBox.min,At.min),this.boundingBox.expandByPoint(dt),dt.addVectors(this.boundingBox.max,At.max),this.boundingBox.expandByPoint(dt)):(this.boundingBox.expandByPoint(At.min),this.boundingBox.expandByPoint(At.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Zi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){const n=this.boundingSphere.center;if(At.setFromBufferAttribute(e),t)for(let a=0,s=t.length;a<s;a++){const o=t[a];Ii.setFromBufferAttribute(o),this.morphTargetsRelative?(dt.addVectors(At.min,Ii.min),At.expandByPoint(dt),dt.addVectors(At.max,Ii.max),At.expandByPoint(dt)):(At.expandByPoint(Ii.min),At.expandByPoint(Ii.max))}At.getCenter(n);let r=0;for(let a=0,s=e.count;a<s;a++)dt.fromBufferAttribute(e,a),r=Math.max(r,n.distanceToSquared(dt));if(t)for(let a=0,s=t.length;a<s;a++){const o=t[a],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)dt.fromBufferAttribute(o,c),l&&(oi.fromBufferAttribute(e,c),dt.add(oi)),r=Math.max(r,n.distanceToSquared(dt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,a=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new wt(new Float32Array(4*n.count),4));const s=this.getAttribute("tangent"),o=[],l=[];for(let D=0;D<n.count;D++)o[D]=new B,l[D]=new B;const c=new B,d=new B,u=new B,f=new Ue,h=new Ue,_=new Ue,v=new B,m=new B;function p(D,S,M){c.fromBufferAttribute(n,D),d.fromBufferAttribute(n,S),u.fromBufferAttribute(n,M),f.fromBufferAttribute(a,D),h.fromBufferAttribute(a,S),_.fromBufferAttribute(a,M),d.sub(c),u.sub(c),h.sub(f),_.sub(f);const C=1/(h.x*_.y-_.x*h.y);isFinite(C)&&(v.copy(d).multiplyScalar(_.y).addScaledVector(u,-h.y).multiplyScalar(C),m.copy(u).multiplyScalar(h.x).addScaledVector(d,-_.x).multiplyScalar(C),o[D].add(v),o[S].add(v),o[M].add(v),l[D].add(m),l[S].add(m),l[M].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let D=0,S=b.length;D<S;++D){const M=b[D],C=M.start,Y=M.count;for(let z=C,W=C+Y;z<W;z+=3)p(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const w=new B,y=new B,L=new B,T=new B;function A(D){L.fromBufferAttribute(r,D),T.copy(L);const S=o[D];w.copy(S),w.sub(L.multiplyScalar(L.dot(S))).normalize(),y.crossVectors(T,S);const C=y.dot(l[D])<0?-1:1;s.setXYZW(D,w.x,w.y,w.z,C)}for(let D=0,S=b.length;D<S;++D){const M=b[D],C=M.start,Y=M.count;for(let z=C,W=C+Y;z<W;z+=3)A(e.getX(z+0)),A(e.getX(z+1)),A(e.getX(z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new wt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);const r=new B,a=new B,s=new B,o=new B,l=new B,c=new B,d=new B,u=new B;if(e)for(let f=0,h=e.count;f<h;f+=3){const _=e.getX(f+0),v=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,v),s.fromBufferAttribute(t,m),d.subVectors(s,a),u.subVectors(r,a),d.cross(u),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(d),l.add(d),c.add(d),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)r.fromBufferAttribute(t,f+0),a.fromBufferAttribute(t,f+1),s.fromBufferAttribute(t,f+2),d.subVectors(s,a),u.subVectors(r,a),d.cross(u),n.setXYZ(f+0,d.x,d.y,d.z),n.setXYZ(f+1,d.x,d.y,d.z),n.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)dt.fromBufferAttribute(e,t),dt.normalize(),e.setXYZ(t,dt.x,dt.y,dt.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,u=o.normalized,f=new c.constructor(l.length*d);let h=0,_=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?h=l[v]*o.data.stride+o.offset:h=l[v]*d;for(let p=0;p<d;p++)f[_++]=c[h++]}return new wt(f,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Dt,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,n);t.setAttribute(o,c)}const a=this.morphAttributes;for(const o in a){const l=[],c=a[o];for(let d=0,u=c.length;d<u;d++){const f=c[d],h=e(f,n);l.push(h)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,l=s.length;o<l;o++){const c=s[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let a=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let u=0,f=c.length;u<f;u++){const h=c[u];d.push(h.toJSON(e.data))}d.length>0&&(r[l]=d,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const c in r){const d=r[c];this.setAttribute(c,d.clone(t))}const a=e.morphAttributes;for(const c in a){const d=[],u=a[c];for(let f=0,h=u.length;f<h;f++)d.push(u[f].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let c=0,d=s.length;c<d;c++){const u=s[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const $a=new rt,Pn=new La,nr=new Zi,qa=new B,ir=new B,rr=new B,sr=new B,Fs=new B,ar=new B,Za=new B,or=new B;class st extends Et{constructor(e=new Dt,t=new Ri){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,s=r.length;a<s;a++){const o=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,a=n.morphAttributes.position,s=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(a&&o){ar.set(0,0,0);for(let l=0,c=a.length;l<c;l++){const d=o[l],u=a[l];d!==0&&(Fs.fromBufferAttribute(u,e),s?ar.addScaledVector(Fs,d):ar.addScaledVector(Fs.sub(t),d))}t.add(ar)}return t}raycast(e,t){const n=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),nr.copy(n.boundingSphere),nr.applyMatrix4(a),Pn.copy(e.ray).recast(e.near),!(nr.containsPoint(Pn.origin)===!1&&(Pn.intersectSphere(nr,qa)===null||Pn.origin.distanceToSquared(qa)>(e.far-e.near)**2))&&($a.copy(a).invert(),Pn.copy(e.ray).applyMatrix4($a),!(n.boundingBox!==null&&Pn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Pn)))}_computeIntersections(e,t,n){let r;const a=this.geometry,s=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,d=a.attributes.uv1,u=a.attributes.normal,f=a.groups,h=a.drawRange;if(o!==null)if(Array.isArray(s))for(let _=0,v=f.length;_<v;_++){const m=f[_],p=s[m.materialIndex],b=Math.max(m.start,h.start),w=Math.min(o.count,Math.min(m.start+m.count,h.start+h.count));for(let y=b,L=w;y<L;y+=3){const T=o.getX(y),A=o.getX(y+1),D=o.getX(y+2);r=lr(this,p,e,n,c,d,u,T,A,D),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,h.start),v=Math.min(o.count,h.start+h.count);for(let m=_,p=v;m<p;m+=3){const b=o.getX(m),w=o.getX(m+1),y=o.getX(m+2);r=lr(this,s,e,n,c,d,u,b,w,y),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(s))for(let _=0,v=f.length;_<v;_++){const m=f[_],p=s[m.materialIndex],b=Math.max(m.start,h.start),w=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let y=b,L=w;y<L;y+=3){const T=y,A=y+1,D=y+2;r=lr(this,p,e,n,c,d,u,T,A,D),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,h.start),v=Math.min(l.count,h.start+h.count);for(let m=_,p=v;m<p;m+=3){const b=m,w=m+1,y=m+2;r=lr(this,s,e,n,c,d,u,b,w,y),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function Uc(i,e,t,n,r,a,s,o){let l;if(e.side===St?l=n.intersectTriangle(s,a,r,!0,o):l=n.intersectTriangle(r,a,s,e.side===un,o),l===null)return null;or.copy(o),or.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(or);return c<t.near||c>t.far?null:{distance:c,point:or.clone(),object:i}}function lr(i,e,t,n,r,a,s,o,l,c){i.getVertexPosition(o,ir),i.getVertexPosition(l,rr),i.getVertexPosition(c,sr);const d=Uc(i,e,t,n,ir,rr,sr,Za);if(d){const u=new B;kt.getBarycoord(Za,ir,rr,sr,u),r&&(d.uv=kt.getInterpolatedAttribute(r,o,l,c,u,new Ue)),a&&(d.uv1=kt.getInterpolatedAttribute(a,o,l,c,u,new Ue)),s&&(d.normal=kt.getInterpolatedAttribute(s,o,l,c,u,new B),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new B,materialIndex:0};kt.getNormal(ir,rr,sr,f.normal),d.face=f,d.barycoord=u}return d}class Pi extends Dt{constructor(e=1,t=1,n=1,r=1,a=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:a,depthSegments:s};const o=this;r=Math.floor(r),a=Math.floor(a),s=Math.floor(s);const l=[],c=[],d=[],u=[];let f=0,h=0;_("z","y","x",-1,-1,n,t,e,s,a,0),_("z","y","x",1,-1,n,t,-e,s,a,1),_("x","z","y",1,1,e,n,t,r,s,2),_("x","z","y",1,-1,e,n,-t,r,s,3),_("x","y","z",1,-1,e,t,n,r,a,4),_("x","y","z",-1,-1,e,t,-n,r,a,5),this.setIndex(l),this.setAttribute("position",new In(c,3)),this.setAttribute("normal",new In(d,3)),this.setAttribute("uv",new In(u,2));function _(v,m,p,b,w,y,L,T,A,D,S){const M=y/A,C=L/D,Y=y/2,z=L/2,W=T/2,K=A+1,G=D+1;let Q=0,H=0;const ie=new B;for(let ce=0;ce<G;ce++){const xe=ce*C-z;for(let De=0;De<K;De++){const $e=De*M-Y;ie[v]=$e*b,ie[m]=xe*w,ie[p]=W,c.push(ie.x,ie.y,ie.z),ie[v]=0,ie[m]=0,ie[p]=T>0?1:-1,d.push(ie.x,ie.y,ie.z),u.push(De/A),u.push(1-ce/D),Q+=1}}for(let ce=0;ce<D;ce++)for(let xe=0;xe<A;xe++){const De=f+xe+K*ce,$e=f+xe+K*(ce+1),X=f+(xe+1)+K*(ce+1),ee=f+(xe+1)+K*ce;l.push(De,$e,ee),l.push($e,X,ee),H+=6}o.addGroup(h,H,S),h+=H,f+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function li(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Mt(i){const e={};for(let t=0;t<i.length;t++){const n=li(i[t]);for(const r in n)e[r]=n[r]}return e}function Dc(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Ka(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Be.workingColorSpace}const Lc={clone:li,merge:Mt};var Nc=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Fc=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ht extends Ci{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Nc,this.fragmentShader=Fc,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=li(e.uniforms),this.uniformsGroups=Dc(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Ja extends Et{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=en}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Mn=new B,ja=new Ue,Qa=new Ue;class Ht extends Ja{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=yi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(xi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return yi*2*Math.atan(Math.tan(xi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Mn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Mn.x,Mn.y).multiplyScalar(-e/Mn.z),Mn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Mn.x,Mn.y).multiplyScalar(-e/Mn.z)}getViewSize(e,t){return this.getViewBounds(e,ja,Qa),t.subVectors(Qa,ja)}setViewOffset(e,t,n,r,a,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(xi*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,a=-.5*r;const s=this.view;if(this.view!==null&&this.view.enabled){const l=s.fullWidth,c=s.fullHeight;a+=s.offsetX*r/l,t-=s.offsetY*n/c,r*=s.width/l,n*=s.height/c}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ci=-90,di=1;class Oc extends Et{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Ht(ci,di,e,t);r.layers=this.layers,this.add(r);const a=new Ht(ci,di,e,t);a.layers=this.layers,this.add(a);const s=new Ht(ci,di,e,t);s.layers=this.layers,this.add(s);const o=new Ht(ci,di,e,t);o.layers=this.layers,this.add(o);const l=new Ht(ci,di,e,t);l.layers=this.layers,this.add(l);const c=new Ht(ci,di,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,a,s,o,l]=t;for(const c of t)this.remove(c);if(e===en)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Wi)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,s,o,l,c,d]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,a),e.setRenderTarget(n,1,r),e.render(t,s),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,r),e.render(t,d),e.setRenderTarget(u,f,h),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class eo extends yt{constructor(e,t,n,r,a,s,o,l,c,d){e=e!==void 0?e:[],t=t!==void 0?t:Hn,super(e,t,n,r,a,s,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Bc extends mn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new eo(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:ft}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Pi(5,5,5),a=new ht({name:"CubemapFromEquirect",uniforms:li(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:St,blending:hn});a.uniforms.tEquirect.value=t;const s=new st(r,a),o=t.minFilter;return t.minFilter===Tn&&(t.minFilter=ft),new Oc(1,10,this).update(e,s),t.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(e,t,n,r){const a=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,n,r);e.setRenderTarget(a)}}const Os=new B,zc=new B,kc=new Ae;class Un{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Os.subVectors(n,t).cross(zc.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Os),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return a<0||a>1?null:t.copy(e.start).addScaledVector(n,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||kc.getNormalMatrix(e),r=this.coplanarPoint(Os).applyMatrix4(e),a=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Dn=new Zi,cr=new B;class to{constructor(e=new Un,t=new Un,n=new Un,r=new Un,a=new Un,s=new Un){this.planes=[e,t,n,r,a,s]}set(e,t,n,r,a,s){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(a),o[5].copy(s),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=en){const n=this.planes,r=e.elements,a=r[0],s=r[1],o=r[2],l=r[3],c=r[4],d=r[5],u=r[6],f=r[7],h=r[8],_=r[9],v=r[10],m=r[11],p=r[12],b=r[13],w=r[14],y=r[15];if(n[0].setComponents(l-a,f-c,m-h,y-p).normalize(),n[1].setComponents(l+a,f+c,m+h,y+p).normalize(),n[2].setComponents(l+s,f+d,m+_,y+b).normalize(),n[3].setComponents(l-s,f-d,m-_,y-b).normalize(),n[4].setComponents(l-o,f-u,m-v,y-w).normalize(),t===en)n[5].setComponents(l+o,f+u,m+v,y+w).normalize();else if(t===Wi)n[5].setComponents(o,u,v,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Dn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Dn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Dn)}intersectsSprite(e){return Dn.center.set(0,0,0),Dn.radius=.7071067811865476,Dn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Dn)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(cr.x=r.normal.x>0?e.max.x:e.min.x,cr.y=r.normal.y>0?e.max.y:e.min.y,cr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(cr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function no(){let i=null,e=!1,t=null,n=null;function r(a,s){t(a,s),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){i=a}}}function Hc(i){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,d),o.onUploadCallback();let h;if(c instanceof Float32Array)h=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?h=i.HALF_FLOAT:h=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=i.SHORT;else if(c instanceof Uint32Array)h=i.UNSIGNED_INT;else if(c instanceof Int32Array)h=i.INT;else if(c instanceof Int8Array)h=i.BYTE;else if(c instanceof Uint8Array)h=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const d=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,d);else{u.sort((h,_)=>h.start-_.start);let f=0;for(let h=1;h<u.length;h++){const _=u[f],v=u[h];v.start<=_.start+_.count+1?_.count=Math.max(_.count,v.start+v.count-_.start):(++f,u[f]=v)}u.length=f+1;for(let h=0,_=u.length;h<_;h++){const v=u[h];i.bufferSubData(c,v.start*d.BYTES_PER_ELEMENT,d,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function s(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:a,update:s}}class tt extends Dt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const a=e/2,s=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,d=l+1,u=e/o,f=t/l,h=[],_=[],v=[],m=[];for(let p=0;p<d;p++){const b=p*f-s;for(let w=0;w<c;w++){const y=w*u-a;_.push(y,-b,0),v.push(0,0,1),m.push(w/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<o;b++){const w=b+c*p,y=b+c*(p+1),L=b+1+c*(p+1),T=b+1+c*p;h.push(w,y,T),h.push(y,L,T)}this.setIndex(h),this.setAttribute("position",new In(_,3)),this.setAttribute("normal",new In(v,3)),this.setAttribute("uv",new In(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new tt(e.width,e.height,e.widthSegments,e.heightSegments)}}var Gc=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Vc=`#ifdef USE_ALPHAHASH
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
#endif`,Wc=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Xc=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yc=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,$c=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,qc=`#ifdef USE_AOMAP
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
#endif`,Zc=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Kc=`#ifdef USE_BATCHING
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
#endif`,Jc=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,jc=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Qc=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ed=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,td=`#ifdef USE_IRIDESCENCE
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
#endif`,nd=`#ifdef USE_BUMPMAP
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
#endif`,id=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,rd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,sd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ad=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,od=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ld=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,cd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,dd=`#if defined( USE_COLOR_ALPHA )
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
#endif`,ud=`#define PI 3.141592653589793
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
} // validated`,hd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,fd=`vec3 transformedNormal = objectNormal;
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
#endif`,pd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,md=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_d=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,vd="gl_FragColor = linearToOutputTexel( gl_FragColor );",xd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,yd=`#ifdef USE_ENVMAP
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
#endif`,Md=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Sd=`#ifdef USE_ENVMAP
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
#endif`,Ed=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,wd=`#ifdef USE_ENVMAP
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
#endif`,bd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Td=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ad=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Cd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Rd=`#ifdef USE_GRADIENTMAP
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
}`,Id=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ud=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Dd=`uniform bool receiveShadow;
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
#endif`,Ld=`#ifdef USE_ENVMAP
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
#endif`,Nd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Fd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Od=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Bd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,zd=`PhysicalMaterial material;
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
#endif`,kd=`struct PhysicalMaterial {
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
}`,Hd=`
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
#endif`,Gd=`#if defined( RE_IndirectDiffuse )
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
#endif`,Vd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Wd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Xd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$d=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,qd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Zd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Kd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Jd=`#if defined( USE_POINTS_UV )
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
#endif`,jd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Qd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,eu=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,tu=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,nu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,iu=`#ifdef USE_MORPHTARGETS
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
#endif`,ru=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,su=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,au=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ou=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,du=`#ifdef USE_NORMALMAP
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
#endif`,uu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,hu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fu=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,pu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,mu=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,_u=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,gu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,vu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xu=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yu=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Mu=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Su=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Eu=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,wu=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,bu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Tu=`float getShadowMask() {
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
}`,Au=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Cu=`#ifdef USE_SKINNING
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
#endif`,Ru=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Iu=`#ifdef USE_SKINNING
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
#endif`,Pu=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Uu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Du=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Lu=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Nu=`#ifdef USE_TRANSMISSION
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
#endif`,Fu=`#ifdef USE_TRANSMISSION
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
#endif`,Ou=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Bu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ku=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ie={alphahash_fragment:Gc,alphahash_pars_fragment:Vc,alphamap_fragment:Wc,alphamap_pars_fragment:Xc,alphatest_fragment:Yc,alphatest_pars_fragment:$c,aomap_fragment:qc,aomap_pars_fragment:Zc,batching_pars_vertex:Kc,batching_vertex:Jc,begin_vertex:jc,beginnormal_vertex:Qc,bsdfs:ed,iridescence_fragment:td,bumpmap_pars_fragment:nd,clipping_planes_fragment:id,clipping_planes_pars_fragment:rd,clipping_planes_pars_vertex:sd,clipping_planes_vertex:ad,color_fragment:od,color_pars_fragment:ld,color_pars_vertex:cd,color_vertex:dd,common:ud,cube_uv_reflection_fragment:hd,defaultnormal_vertex:fd,displacementmap_pars_vertex:pd,displacementmap_vertex:md,emissivemap_fragment:_d,emissivemap_pars_fragment:gd,colorspace_fragment:vd,colorspace_pars_fragment:xd,envmap_fragment:yd,envmap_common_pars_fragment:Md,envmap_pars_fragment:Sd,envmap_pars_vertex:Ed,envmap_physical_pars_fragment:Ld,envmap_vertex:wd,fog_vertex:bd,fog_pars_vertex:Td,fog_fragment:Ad,fog_pars_fragment:Cd,gradientmap_pars_fragment:Rd,lightmap_pars_fragment:Id,lights_lambert_fragment:Pd,lights_lambert_pars_fragment:Ud,lights_pars_begin:Dd,lights_toon_fragment:Nd,lights_toon_pars_fragment:Fd,lights_phong_fragment:Od,lights_phong_pars_fragment:Bd,lights_physical_fragment:zd,lights_physical_pars_fragment:kd,lights_fragment_begin:Hd,lights_fragment_maps:Gd,lights_fragment_end:Vd,logdepthbuf_fragment:Wd,logdepthbuf_pars_fragment:Xd,logdepthbuf_pars_vertex:Yd,logdepthbuf_vertex:$d,map_fragment:qd,map_pars_fragment:Zd,map_particle_fragment:Kd,map_particle_pars_fragment:Jd,metalnessmap_fragment:jd,metalnessmap_pars_fragment:Qd,morphinstance_vertex:eu,morphcolor_vertex:tu,morphnormal_vertex:nu,morphtarget_pars_vertex:iu,morphtarget_vertex:ru,normal_fragment_begin:su,normal_fragment_maps:au,normal_pars_fragment:ou,normal_pars_vertex:lu,normal_vertex:cu,normalmap_pars_fragment:du,clearcoat_normal_fragment_begin:uu,clearcoat_normal_fragment_maps:hu,clearcoat_pars_fragment:fu,iridescence_pars_fragment:pu,opaque_fragment:mu,packing:_u,premultiplied_alpha_fragment:gu,project_vertex:vu,dithering_fragment:xu,dithering_pars_fragment:yu,roughnessmap_fragment:Mu,roughnessmap_pars_fragment:Su,shadowmap_pars_fragment:Eu,shadowmap_pars_vertex:wu,shadowmap_vertex:bu,shadowmask_pars_fragment:Tu,skinbase_vertex:Au,skinning_pars_vertex:Cu,skinning_vertex:Ru,skinnormal_vertex:Iu,specularmap_fragment:Pu,specularmap_pars_fragment:Uu,tonemapping_fragment:Du,tonemapping_pars_fragment:Lu,transmission_fragment:Nu,transmission_pars_fragment:Fu,uv_pars_fragment:Ou,uv_pars_vertex:Bu,uv_vertex:zu,worldpos_vertex:ku,background_vert:`varying vec2 vUv;
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
}`},te={common:{diffuse:{value:new Ge(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ae},alphaMap:{value:null},alphaMapTransform:{value:new Ae},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ae}},envmap:{envMap:{value:null},envMapRotation:{value:new Ae},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ae}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ae}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ae},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ae},normalScale:{value:new Ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ae},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ae}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ae}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ae}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ge(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ge(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ae},alphaTest:{value:0},uvTransform:{value:new Ae}},sprite:{diffuse:{value:new Ge(16777215)},opacity:{value:1},center:{value:new Ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ae},alphaMap:{value:null},alphaMapTransform:{value:new Ae},alphaTest:{value:0}}},qt={basic:{uniforms:Mt([te.common,te.specularmap,te.envmap,te.aomap,te.lightmap,te.fog]),vertexShader:Ie.meshbasic_vert,fragmentShader:Ie.meshbasic_frag},lambert:{uniforms:Mt([te.common,te.specularmap,te.envmap,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.fog,te.lights,{emissive:{value:new Ge(0)}}]),vertexShader:Ie.meshlambert_vert,fragmentShader:Ie.meshlambert_frag},phong:{uniforms:Mt([te.common,te.specularmap,te.envmap,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.fog,te.lights,{emissive:{value:new Ge(0)},specular:{value:new Ge(1118481)},shininess:{value:30}}]),vertexShader:Ie.meshphong_vert,fragmentShader:Ie.meshphong_frag},standard:{uniforms:Mt([te.common,te.envmap,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.roughnessmap,te.metalnessmap,te.fog,te.lights,{emissive:{value:new Ge(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag},toon:{uniforms:Mt([te.common,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.gradientmap,te.fog,te.lights,{emissive:{value:new Ge(0)}}]),vertexShader:Ie.meshtoon_vert,fragmentShader:Ie.meshtoon_frag},matcap:{uniforms:Mt([te.common,te.bumpmap,te.normalmap,te.displacementmap,te.fog,{matcap:{value:null}}]),vertexShader:Ie.meshmatcap_vert,fragmentShader:Ie.meshmatcap_frag},points:{uniforms:Mt([te.points,te.fog]),vertexShader:Ie.points_vert,fragmentShader:Ie.points_frag},dashed:{uniforms:Mt([te.common,te.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ie.linedashed_vert,fragmentShader:Ie.linedashed_frag},depth:{uniforms:Mt([te.common,te.displacementmap]),vertexShader:Ie.depth_vert,fragmentShader:Ie.depth_frag},normal:{uniforms:Mt([te.common,te.bumpmap,te.normalmap,te.displacementmap,{opacity:{value:1}}]),vertexShader:Ie.meshnormal_vert,fragmentShader:Ie.meshnormal_frag},sprite:{uniforms:Mt([te.sprite,te.fog]),vertexShader:Ie.sprite_vert,fragmentShader:Ie.sprite_frag},background:{uniforms:{uvTransform:{value:new Ae},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ie.background_vert,fragmentShader:Ie.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ae}},vertexShader:Ie.backgroundCube_vert,fragmentShader:Ie.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ie.cube_vert,fragmentShader:Ie.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ie.equirect_vert,fragmentShader:Ie.equirect_frag},distanceRGBA:{uniforms:Mt([te.common,te.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ie.distanceRGBA_vert,fragmentShader:Ie.distanceRGBA_frag},shadow:{uniforms:Mt([te.lights,te.fog,{color:{value:new Ge(0)},opacity:{value:1}}]),vertexShader:Ie.shadow_vert,fragmentShader:Ie.shadow_frag}};qt.physical={uniforms:Mt([qt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ae},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ae},clearcoatNormalScale:{value:new Ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ae},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ae},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ae},sheen:{value:0},sheenColor:{value:new Ge(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ae},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ae},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ae},transmissionSamplerSize:{value:new Ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ae},attenuationDistance:{value:0},attenuationColor:{value:new Ge(0)},specularColor:{value:new Ge(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ae},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ae},anisotropyVector:{value:new Ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ae}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag};const dr={r:0,b:0,g:0},Ln=new sn,Hu=new rt;function Gu(i,e,t,n,r,a,s){const o=new Ge(0);let l=a===!0?0:1,c,d,u=null,f=0,h=null;function _(b){let w=b.isScene===!0?b.background:null;return w&&w.isTexture&&(w=(b.backgroundBlurriness>0?t:e).get(w)),w}function v(b){let w=!1;const y=_(b);y===null?p(o,l):y&&y.isColor&&(p(y,1),w=!0);const L=i.xr.getEnvironmentBlendMode();L==="additive"?n.buffers.color.setClear(0,0,0,1,s):L==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(i.autoClear||w)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(b,w){const y=_(w);y&&(y.isCubeTexture||y.mapping===Fi)?(d===void 0&&(d=new st(new Pi(1,1,1),new ht({name:"BackgroundCubeMaterial",uniforms:li(qt.backgroundCube.uniforms),vertexShader:qt.backgroundCube.vertexShader,fragmentShader:qt.backgroundCube.fragmentShader,side:St,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(L,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),Ln.copy(w.backgroundRotation),Ln.x*=-1,Ln.y*=-1,Ln.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ln.y*=-1,Ln.z*=-1),d.material.uniforms.envMap.value=y,d.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(Hu.makeRotationFromEuler(Ln)),d.material.toneMapped=Be.getTransfer(y.colorSpace)!==Ye,(u!==y||f!==y.version||h!==i.toneMapping)&&(d.material.needsUpdate=!0,u=y,f=y.version,h=i.toneMapping),d.layers.enableAll(),b.unshift(d,d.geometry,d.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new st(new tt(2,2),new ht({name:"BackgroundMaterial",uniforms:li(qt.background.uniforms),vertexShader:qt.background.vertexShader,fragmentShader:qt.background.fragmentShader,side:un,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.toneMapped=Be.getTransfer(y.colorSpace)!==Ye,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||f!==y.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=y,f=y.version,h=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function p(b,w){b.getRGB(dr,Ka(i)),n.buffers.color.setClear(dr.r,dr.g,dr.b,w,s)}return{getClearColor:function(){return o},setClearColor:function(b,w=1){o.set(b),l=w,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,p(o,l)},render:v,addToRenderList:m}}function Vu(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=f(null);let a=r,s=!1;function o(M,C,Y,z,W){let K=!1;const G=u(z,Y,C);a!==G&&(a=G,c(a.object)),K=h(M,z,Y,W),K&&_(M,z,Y,W),W!==null&&e.update(W,i.ELEMENT_ARRAY_BUFFER),(K||s)&&(s=!1,y(M,C,Y,z),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function l(){return i.createVertexArray()}function c(M){return i.bindVertexArray(M)}function d(M){return i.deleteVertexArray(M)}function u(M,C,Y){const z=Y.wireframe===!0;let W=n[M.id];W===void 0&&(W={},n[M.id]=W);let K=W[C.id];K===void 0&&(K={},W[C.id]=K);let G=K[z];return G===void 0&&(G=f(l()),K[z]=G),G}function f(M){const C=[],Y=[],z=[];for(let W=0;W<t;W++)C[W]=0,Y[W]=0,z[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:Y,attributeDivisors:z,object:M,attributes:{},index:null}}function h(M,C,Y,z){const W=a.attributes,K=C.attributes;let G=0;const Q=Y.getAttributes();for(const H in Q)if(Q[H].location>=0){const ce=W[H];let xe=K[H];if(xe===void 0&&(H==="instanceMatrix"&&M.instanceMatrix&&(xe=M.instanceMatrix),H==="instanceColor"&&M.instanceColor&&(xe=M.instanceColor)),ce===void 0||ce.attribute!==xe||xe&&ce.data!==xe.data)return!0;G++}return a.attributesNum!==G||a.index!==z}function _(M,C,Y,z){const W={},K=C.attributes;let G=0;const Q=Y.getAttributes();for(const H in Q)if(Q[H].location>=0){let ce=K[H];ce===void 0&&(H==="instanceMatrix"&&M.instanceMatrix&&(ce=M.instanceMatrix),H==="instanceColor"&&M.instanceColor&&(ce=M.instanceColor));const xe={};xe.attribute=ce,ce&&ce.data&&(xe.data=ce.data),W[H]=xe,G++}a.attributes=W,a.attributesNum=G,a.index=z}function v(){const M=a.newAttributes;for(let C=0,Y=M.length;C<Y;C++)M[C]=0}function m(M){p(M,0)}function p(M,C){const Y=a.newAttributes,z=a.enabledAttributes,W=a.attributeDivisors;Y[M]=1,z[M]===0&&(i.enableVertexAttribArray(M),z[M]=1),W[M]!==C&&(i.vertexAttribDivisor(M,C),W[M]=C)}function b(){const M=a.newAttributes,C=a.enabledAttributes;for(let Y=0,z=C.length;Y<z;Y++)C[Y]!==M[Y]&&(i.disableVertexAttribArray(Y),C[Y]=0)}function w(M,C,Y,z,W,K,G){G===!0?i.vertexAttribIPointer(M,C,Y,W,K):i.vertexAttribPointer(M,C,Y,z,W,K)}function y(M,C,Y,z){v();const W=z.attributes,K=Y.getAttributes(),G=C.defaultAttributeValues;for(const Q in K){const H=K[Q];if(H.location>=0){let ie=W[Q];if(ie===void 0&&(Q==="instanceMatrix"&&M.instanceMatrix&&(ie=M.instanceMatrix),Q==="instanceColor"&&M.instanceColor&&(ie=M.instanceColor)),ie!==void 0){const ce=ie.normalized,xe=ie.itemSize,De=e.get(ie);if(De===void 0)continue;const $e=De.buffer,X=De.type,ee=De.bytesPerElement,_e=X===i.INT||X===i.UNSIGNED_INT||ie.gpuType===zr;if(ie.isInterleavedBufferAttribute){const re=ie.data,Ee=re.stride,Te=ie.offset;if(re.isInstancedInterleavedBuffer){for(let Le=0;Le<H.locationSize;Le++)p(H.location+Le,re.meshPerAttribute);M.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Le=0;Le<H.locationSize;Le++)m(H.location+Le);i.bindBuffer(i.ARRAY_BUFFER,$e);for(let Le=0;Le<H.locationSize;Le++)w(H.location+Le,xe/H.locationSize,X,ce,Ee*ee,(Te+xe/H.locationSize*Le)*ee,_e)}else{if(ie.isInstancedBufferAttribute){for(let re=0;re<H.locationSize;re++)p(H.location+re,ie.meshPerAttribute);M.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let re=0;re<H.locationSize;re++)m(H.location+re);i.bindBuffer(i.ARRAY_BUFFER,$e);for(let re=0;re<H.locationSize;re++)w(H.location+re,xe/H.locationSize,X,ce,xe*ee,xe/H.locationSize*re*ee,_e)}}else if(G!==void 0){const ce=G[Q];if(ce!==void 0)switch(ce.length){case 2:i.vertexAttrib2fv(H.location,ce);break;case 3:i.vertexAttrib3fv(H.location,ce);break;case 4:i.vertexAttrib4fv(H.location,ce);break;default:i.vertexAttrib1fv(H.location,ce)}}}}b()}function L(){D();for(const M in n){const C=n[M];for(const Y in C){const z=C[Y];for(const W in z)d(z[W].object),delete z[W];delete C[Y]}delete n[M]}}function T(M){if(n[M.id]===void 0)return;const C=n[M.id];for(const Y in C){const z=C[Y];for(const W in z)d(z[W].object),delete z[W];delete C[Y]}delete n[M.id]}function A(M){for(const C in n){const Y=n[C];if(Y[M.id]===void 0)continue;const z=Y[M.id];for(const W in z)d(z[W].object),delete z[W];delete Y[M.id]}}function D(){S(),s=!0,a!==r&&(a=r,c(a.object))}function S(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:D,resetDefaultState:S,dispose:L,releaseStatesOfGeometry:T,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:m,disableUnusedAttributes:b}}function Wu(i,e,t){let n;function r(c){n=c}function a(c,d){i.drawArrays(n,c,d),t.update(d,n,1)}function s(c,d,u){u!==0&&(i.drawArraysInstanced(n,c,d,u),t.update(d,n,u))}function o(c,d,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,d,0,u);let h=0;for(let _=0;_<u;_++)h+=d[_];t.update(h,n,1)}function l(c,d,u,f){if(u===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let _=0;_<c.length;_++)s(c[_],d[_],f[_]);else{h.multiDrawArraysInstancedWEBGL(n,c,0,d,0,f,0,u);let _=0;for(let v=0;v<u;v++)_+=d[v]*f[v];t.update(_,n,1)}}this.setMode=r,this.render=a,this.renderInstances=s,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Xu(i,e,t,n){let r;function a(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function s(A){return!(A!==It&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const D=A===vi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==$t&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Qt&&!D)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const u=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),L=_>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:s,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:h,maxVertexTextures:_,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:w,maxFragmentUniforms:y,vertexTextures:L,maxSamples:T}}function Yu(i){const e=this;let t=null,n=0,r=!1,a=!1;const s=new Un,o=new Ae,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const h=u.length!==0||f||n!==0||r;return r=f,n=u.length,h},this.beginShadows=function(){a=!0,d(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(u,f){t=d(u,f,0)},this.setState=function(u,f,h){const _=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!r||_===null||_.length===0||a&&!m)a?d(null):c();else{const b=a?0:n,w=b*4;let y=p.clippingState||null;l.value=y,y=d(_,f,w,h);for(let L=0;L!==w;++L)y[L]=t[L];p.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(u,f,h,_){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,_!==!0||m===null){const p=h+v*4,b=f.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,y=h;w!==v;++w,y+=4)s.copy(u[w]).applyMatrix4(b,o),s.normal.toArray(m,y),m[y+3]=s.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function $u(i){let e=new WeakMap;function t(s,o){return o===Lr?s.mapping=Hn:o===Nr&&(s.mapping=Gn),s}function n(s){if(s&&s.isTexture){const o=s.mapping;if(o===Lr||o===Nr)if(e.has(s)){const l=e.get(s).texture;return t(l,s.mapping)}else{const l=s.image;if(l&&l.height>0){const c=new Bc(l.height);return c.fromEquirectangularTexture(i,s),e.set(s,c),s.addEventListener("dispose",r),t(c.texture,s.mapping)}else return null}}return s}function r(s){const o=s.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function a(){e=new WeakMap}return{get:n,dispose:a}}class Bs extends Ja{constructor(e=-1,t=1,n=1,r=-1,a=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=a,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,a,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=n-e,s=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,s=a+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(a,s,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ui=4,io=[.125,.215,.35,.446,.526,.582],Nn=20,zs=new Bs,ro=new Ge;let ks=null,Hs=0,Gs=0,Vs=!1;const Fn=(1+Math.sqrt(5))/2,hi=1/Fn,so=[new B(-Fn,hi,0),new B(Fn,hi,0),new B(-hi,0,Fn),new B(hi,0,Fn),new B(0,Fn,-hi),new B(0,Fn,hi),new B(-1,1,-1),new B(1,1,-1),new B(-1,1,1),new B(1,1,1)];class ao{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){ks=this._renderer.getRenderTarget(),Hs=this._renderer.getActiveCubeFace(),Gs=this._renderer.getActiveMipmapLevel(),Vs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,n,r,a),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=co(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=lo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ks,Hs,Gs),this._renderer.xr.enabled=Vs,e.scissorTest=!1,ur(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Hn||e.mapping===Gn?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ks=this._renderer.getRenderTarget(),Hs=this._renderer.getActiveCubeFace(),Gs=this._renderer.getActiveMipmapLevel(),Vs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ft,minFilter:ft,generateMipmaps:!1,type:vi,format:It,colorSpace:Yn,depthBuffer:!1},r=oo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=oo(e,t,n);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=qu(a)),this._blurMaterial=Zu(a,e,t)}return r}_compileMaterial(e){const t=new st(this._lodPlanes[0],e);this._renderer.compile(t,zs)}_sceneToCubeUV(e,t,n,r){const o=new Ht(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(ro),d.toneMapping=fn,d.autoClear=!1;const h=new Ri({name:"PMREM.Background",side:St,depthWrite:!1,depthTest:!1}),_=new st(new Pi,h);let v=!1;const m=e.background;m?m.isColor&&(h.color.copy(m),e.background=null,v=!0):(h.color.copy(ro),v=!0);for(let p=0;p<6;p++){const b=p%3;b===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):b===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const w=this._cubeSize;ur(r,b*w,p>2?w:0,w,w),d.setRenderTarget(r),v&&d.render(_,o),d.render(e,o)}_.geometry.dispose(),_.material.dispose(),d.toneMapping=f,d.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Hn||e.mapping===Gn;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=co()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=lo());const a=r?this._cubemapMaterial:this._equirectMaterial,s=new st(this._lodPlanes[0],a),o=a.uniforms;o.envMap.value=e;const l=this._cubeSize;ur(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(s,zs)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let a=1;a<r;a++){const s=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),o=so[(r-a-1)%so.length];this._blur(e,a-1,a,s,o)}t.autoClear=n}_blur(e,t,n,r,a){const s=this._pingPongRenderTarget;this._halfBlur(e,s,t,n,r,"latitudinal",a),this._halfBlur(s,e,n,n,r,"longitudinal",a)}_halfBlur(e,t,n,r,a,s,o){const l=this._renderer,c=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,u=new st(this._lodPlanes[r],c),f=c.uniforms,h=this._sizeLods[n]-1,_=isFinite(a)?Math.PI/(2*h):2*Math.PI/(2*Nn-1),v=a/_,m=isFinite(a)?1+Math.floor(d*v):Nn;m>Nn&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Nn}`);const p=[];let b=0;for(let A=0;A<Nn;++A){const D=A/v,S=Math.exp(-D*D/2);p.push(S),A===0?b+=S:A<m&&(b+=2*S)}for(let A=0;A<p.length;A++)p[A]=p[A]/b;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=s==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:w}=this;f.dTheta.value=_,f.mipInt.value=w-n;const y=this._sizeLods[r],L=3*y*(r>w-ui?r-w+ui:0),T=4*(this._cubeSize-y);ur(t,L,T,3*y,2*y),l.setRenderTarget(t),l.render(u,zs)}}function qu(i){const e=[],t=[],n=[];let r=i;const a=i-ui+1+io.length;for(let s=0;s<a;s++){const o=Math.pow(2,r);t.push(o);let l=1/o;s>i-ui?l=io[s-i+ui-1]:s===0&&(l=0),n.push(l);const c=1/(o-2),d=-c,u=1+c,f=[d,d,u,d,u,u,d,d,u,u,d,u],h=6,_=6,v=3,m=2,p=1,b=new Float32Array(v*_*h),w=new Float32Array(m*_*h),y=new Float32Array(p*_*h);for(let T=0;T<h;T++){const A=T%3*2/3-1,D=T>2?0:-1,S=[A,D,0,A+2/3,D,0,A+2/3,D+1,0,A,D,0,A+2/3,D+1,0,A,D+1,0];b.set(S,v*_*T),w.set(f,m*_*T);const M=[T,T,T,T,T,T];y.set(M,p*_*T)}const L=new Dt;L.setAttribute("position",new wt(b,v)),L.setAttribute("uv",new wt(w,m)),L.setAttribute("faceIndex",new wt(y,p)),e.push(L),r>ui&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function oo(i,e,t){const n=new mn(i,e,t);return n.texture.mapping=Fi,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ur(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Zu(i,e,t){const n=new Float32Array(Nn),r=new B(0,1,0);return new ht({name:"SphericalGaussianBlur",defines:{n:Nn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ws(),fragmentShader:`

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
		`,blending:hn,depthTest:!1,depthWrite:!1})}function lo(){return new ht({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ws(),fragmentShader:`

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
		`,blending:hn,depthTest:!1,depthWrite:!1})}function co(){return new ht({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ws(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:hn,depthTest:!1,depthWrite:!1})}function Ws(){return`

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
	`}function Ku(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Lr||l===Nr,d=l===Hn||l===Gn;if(c||d){let u=e.get(o);const f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new ao(i)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const h=o.image;return c&&h&&h.height>0||d&&h&&r(h)?(t===null&&(t=new ao(i)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",a),u.texture):null}}}return o}function r(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function a(o){const l=o.target;l.removeEventListener("dispose",a);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function s(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:s}}function Ju(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Si("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function ju(i,e,t,n){const r={},a=new WeakMap;function s(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);for(const _ in f.morphAttributes){const v=f.morphAttributes[_];for(let m=0,p=v.length;m<p;m++)e.remove(v[m])}f.removeEventListener("dispose",s),delete r[f.id];const h=a.get(f);h&&(e.remove(h),a.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(u,f){return r[f.id]===!0||(f.addEventListener("dispose",s),r[f.id]=!0,t.memory.geometries++),f}function l(u){const f=u.attributes;for(const _ in f)e.update(f[_],i.ARRAY_BUFFER);const h=u.morphAttributes;for(const _ in h){const v=h[_];for(let m=0,p=v.length;m<p;m++)e.update(v[m],i.ARRAY_BUFFER)}}function c(u){const f=[],h=u.index,_=u.attributes.position;let v=0;if(h!==null){const b=h.array;v=h.version;for(let w=0,y=b.length;w<y;w+=3){const L=b[w+0],T=b[w+1],A=b[w+2];f.push(L,T,T,A,A,L)}}else if(_!==void 0){const b=_.array;v=_.version;for(let w=0,y=b.length/3-1;w<y;w+=3){const L=w+0,T=w+1,A=w+2;f.push(L,T,T,A,A,L)}}else return;const m=new(wa(f)?Ya:Xa)(f,1);m.version=v;const p=a.get(u);p&&e.remove(p),a.set(u,m)}function d(u){const f=a.get(u);if(f){const h=u.index;h!==null&&f.version<h.version&&c(u)}else c(u);return a.get(u)}return{get:o,update:l,getWireframeAttribute:d}}function Qu(i,e,t){let n;function r(f){n=f}let a,s;function o(f){a=f.type,s=f.bytesPerElement}function l(f,h){i.drawElements(n,h,a,f*s),t.update(h,n,1)}function c(f,h,_){_!==0&&(i.drawElementsInstanced(n,h,a,f*s,_),t.update(h,n,_))}function d(f,h,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,a,f,0,_);let m=0;for(let p=0;p<_;p++)m+=h[p];t.update(m,n,1)}function u(f,h,_,v){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/s,h[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,h,0,a,f,0,v,0,_);let p=0;for(let b=0;b<_;b++)p+=h[b]*v[b];t.update(p,n,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function eh(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(a,s,o){switch(t.calls++,s){case i.TRIANGLES:t.triangles+=o*(a/3);break;case i.LINES:t.lines+=o*(a/2);break;case i.LINE_STRIP:t.lines+=o*(a-1);break;case i.LINE_LOOP:t.lines+=o*a;break;case i.POINTS:t.points+=o*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function th(i,e,t){const n=new WeakMap,r=new it;function a(s,o,l){const c=s.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0;let f=n.get(o);if(f===void 0||f.count!==u){let S=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",S)};f!==void 0&&f.texture.dispose();const h=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let w=0;h===!0&&(w=1),_===!0&&(w=2),v===!0&&(w=3);let y=o.attributes.position.count*w,L=1;y>e.maxTextureSize&&(L=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const T=new Float32Array(y*L*4*u),A=new Ua(T,y,L,u);A.type=Qt,A.needsUpdate=!0;const D=w*4;for(let M=0;M<u;M++){const C=m[M],Y=p[M],z=b[M],W=y*L*4*M;for(let K=0;K<C.count;K++){const G=K*D;h===!0&&(r.fromBufferAttribute(C,K),T[W+G+0]=r.x,T[W+G+1]=r.y,T[W+G+2]=r.z,T[W+G+3]=0),_===!0&&(r.fromBufferAttribute(Y,K),T[W+G+4]=r.x,T[W+G+5]=r.y,T[W+G+6]=r.z,T[W+G+7]=0),v===!0&&(r.fromBufferAttribute(z,K),T[W+G+8]=r.x,T[W+G+9]=r.y,T[W+G+10]=r.z,T[W+G+11]=z.itemSize===4?r.w:1)}}f={count:u,texture:A,size:new Ue(y,L)},n.set(o,f),o.addEventListener("dispose",S)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",s.morphTexture,t);else{let h=0;for(let v=0;v<c.length;v++)h+=c[v];const _=o.morphTargetsRelative?1:1-h;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:a}}function nh(i,e,t,n){let r=new WeakMap;function a(l){const c=n.render.frame,d=l.geometry,u=e.get(l,d);if(r.get(u)!==c&&(e.update(u),r.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return u}function s(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:a,dispose:s}}class uo extends yt{constructor(e,t,n,r,a,s,o,l,c,d=Wn){if(d!==Wn&&d!==Xn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===Wn&&(n=An),n===void 0&&d===Xn&&(n=Vn),super(null,r,a,s,o,l,d,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Ft,this.minFilter=l!==void 0?l:Ft,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const ho=new yt,fo=new uo(1,1),po=new Ua,mo=new Sc,_o=new eo,go=[],vo=[],xo=new Float32Array(16),yo=new Float32Array(9),Mo=new Float32Array(4);function fi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let a=go[r];if(a===void 0&&(a=new Float32Array(r),go[r]=a),e!==0){n.toArray(a,0);for(let s=1,o=0;s!==e;++s)o+=t,i[s].toArray(a,o)}return a}function lt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function ct(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function hr(i,e){let t=vo[e];t===void 0&&(t=new Int32Array(e),vo[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function ih(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function rh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(lt(t,e))return;i.uniform2fv(this.addr,e),ct(t,e)}}function sh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(lt(t,e))return;i.uniform3fv(this.addr,e),ct(t,e)}}function ah(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(lt(t,e))return;i.uniform4fv(this.addr,e),ct(t,e)}}function oh(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(lt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),ct(t,e)}else{if(lt(t,n))return;Mo.set(n),i.uniformMatrix2fv(this.addr,!1,Mo),ct(t,n)}}function lh(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(lt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),ct(t,e)}else{if(lt(t,n))return;yo.set(n),i.uniformMatrix3fv(this.addr,!1,yo),ct(t,n)}}function ch(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(lt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),ct(t,e)}else{if(lt(t,n))return;xo.set(n),i.uniformMatrix4fv(this.addr,!1,xo),ct(t,n)}}function dh(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function uh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(lt(t,e))return;i.uniform2iv(this.addr,e),ct(t,e)}}function hh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(lt(t,e))return;i.uniform3iv(this.addr,e),ct(t,e)}}function fh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(lt(t,e))return;i.uniform4iv(this.addr,e),ct(t,e)}}function ph(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function mh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(lt(t,e))return;i.uniform2uiv(this.addr,e),ct(t,e)}}function _h(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(lt(t,e))return;i.uniform3uiv(this.addr,e),ct(t,e)}}function gh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(lt(t,e))return;i.uniform4uiv(this.addr,e),ct(t,e)}}function vh(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let a;this.type===i.SAMPLER_2D_SHADOW?(fo.compareFunction=ya,a=fo):a=ho,t.setTexture2D(e||a,r)}function xh(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||mo,r)}function yh(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||_o,r)}function Mh(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||po,r)}function Sh(i){switch(i){case 5126:return ih;case 35664:return rh;case 35665:return sh;case 35666:return ah;case 35674:return oh;case 35675:return lh;case 35676:return ch;case 5124:case 35670:return dh;case 35667:case 35671:return uh;case 35668:case 35672:return hh;case 35669:case 35673:return fh;case 5125:return ph;case 36294:return mh;case 36295:return _h;case 36296:return gh;case 35678:case 36198:case 36298:case 36306:case 35682:return vh;case 35679:case 36299:case 36307:return xh;case 35680:case 36300:case 36308:case 36293:return yh;case 36289:case 36303:case 36311:case 36292:return Mh}}function Eh(i,e){i.uniform1fv(this.addr,e)}function wh(i,e){const t=fi(e,this.size,2);i.uniform2fv(this.addr,t)}function bh(i,e){const t=fi(e,this.size,3);i.uniform3fv(this.addr,t)}function Th(i,e){const t=fi(e,this.size,4);i.uniform4fv(this.addr,t)}function Ah(i,e){const t=fi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Ch(i,e){const t=fi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Rh(i,e){const t=fi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Ih(i,e){i.uniform1iv(this.addr,e)}function Ph(i,e){i.uniform2iv(this.addr,e)}function Uh(i,e){i.uniform3iv(this.addr,e)}function Dh(i,e){i.uniform4iv(this.addr,e)}function Lh(i,e){i.uniform1uiv(this.addr,e)}function Nh(i,e){i.uniform2uiv(this.addr,e)}function Fh(i,e){i.uniform3uiv(this.addr,e)}function Oh(i,e){i.uniform4uiv(this.addr,e)}function Bh(i,e,t){const n=this.cache,r=e.length,a=hr(t,r);lt(n,a)||(i.uniform1iv(this.addr,a),ct(n,a));for(let s=0;s!==r;++s)t.setTexture2D(e[s]||ho,a[s])}function zh(i,e,t){const n=this.cache,r=e.length,a=hr(t,r);lt(n,a)||(i.uniform1iv(this.addr,a),ct(n,a));for(let s=0;s!==r;++s)t.setTexture3D(e[s]||mo,a[s])}function kh(i,e,t){const n=this.cache,r=e.length,a=hr(t,r);lt(n,a)||(i.uniform1iv(this.addr,a),ct(n,a));for(let s=0;s!==r;++s)t.setTextureCube(e[s]||_o,a[s])}function Hh(i,e,t){const n=this.cache,r=e.length,a=hr(t,r);lt(n,a)||(i.uniform1iv(this.addr,a),ct(n,a));for(let s=0;s!==r;++s)t.setTexture2DArray(e[s]||po,a[s])}function Gh(i){switch(i){case 5126:return Eh;case 35664:return wh;case 35665:return bh;case 35666:return Th;case 35674:return Ah;case 35675:return Ch;case 35676:return Rh;case 5124:case 35670:return Ih;case 35667:case 35671:return Ph;case 35668:case 35672:return Uh;case 35669:case 35673:return Dh;case 5125:return Lh;case 36294:return Nh;case 36295:return Fh;case 36296:return Oh;case 35678:case 36198:case 36298:case 36306:case 35682:return Bh;case 35679:case 36299:case 36307:return zh;case 35680:case 36300:case 36308:case 36293:return kh;case 36289:case 36303:case 36311:case 36292:return Hh}}class Vh{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Sh(t.type)}}class Wh{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Gh(t.type)}}class Xh{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let a=0,s=r.length;a!==s;++a){const o=r[a];o.setValue(e,t[o.id],n)}}}const Xs=/(\w+)(\])?(\[|\.)?/g;function So(i,e){i.seq.push(e),i.map[e.id]=e}function Yh(i,e,t){const n=i.name,r=n.length;for(Xs.lastIndex=0;;){const a=Xs.exec(n),s=Xs.lastIndex;let o=a[1];const l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&s+2===r){So(t,c===void 0?new Vh(o,i,e):new Wh(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new Xh(o),So(t,u)),t=u}}}class fr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const a=e.getActiveUniform(t,r),s=e.getUniformLocation(t,a.name);Yh(a,s,this)}}setValue(e,t,n,r){const a=this.map[t];a!==void 0&&a.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let a=0,s=t.length;a!==s;++a){const o=t[a],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,a=e.length;r!==a;++r){const s=e[r];s.id in t&&n.push(s)}return n}}function Eo(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const $h=37297;let qh=0;function Zh(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let s=r;s<a;s++){const o=s+1;n.push(`${o===e?">":" "} ${o}: ${t[s]}`)}return n.join(`
`)}const wo=new Ae;function Kh(i){Be._getMatrix(wo,Be.workingColorSpace,i);const e=`mat3( ${wo.elements.map(t=>t.toFixed(4))} )`;switch(Be.getTransfer(i)){case Vi:return[e,"LinearTransferOETF"];case Ye:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function bo(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const s=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Zh(i.getShaderSource(e),s)}else return r}function Jh(i,e){const t=Kh(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function jh(i,e){let t;switch(e){case Dl:t="Linear";break;case Ll:t="Reinhard";break;case Nl:t="Cineon";break;case Fl:t="ACESFilmic";break;case Bl:t="AgX";break;case zl:t="Neutral";break;case Ol:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const pr=new B;function Qh(){Be.getLuminanceCoefficients(pr);const i=pr.x.toFixed(4),e=pr.y.toFixed(4),t=pr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ef(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ui).join(`
`)}function tf(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function nf(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const a=i.getActiveAttrib(e,r),s=a.name;let o=1;a.type===i.FLOAT_MAT2&&(o=2),a.type===i.FLOAT_MAT3&&(o=3),a.type===i.FLOAT_MAT4&&(o=4),t[s]={type:a.type,location:i.getAttribLocation(e,s),locationSize:o}}return t}function Ui(i){return i!==""}function To(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ao(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const rf=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ys(i){return i.replace(rf,af)}const sf=new Map;function af(i,e){let t=Ie[e];if(t===void 0){const n=sf.get(e);if(n!==void 0)t=Ie[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ys(t)}const of=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Co(i){return i.replace(of,lf)}function lf(i,e,t,n){let r="";for(let a=parseInt(e);a<parseInt(t);a++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function Ro(i){let e=`precision ${i.precision} float;
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
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function cf(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ra?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===hl?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Jt&&(e="SHADOWMAP_TYPE_VSM"),e}function df(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Hn:case Gn:e="ENVMAP_TYPE_CUBE";break;case Fi:e="ENVMAP_TYPE_CUBE_UV";break}return e}function uf(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Gn:e="ENVMAP_MODE_REFRACTION";break}return e}function hf(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case oa:e="ENVMAP_BLENDING_MULTIPLY";break;case Pl:e="ENVMAP_BLENDING_MIX";break;case Ul:e="ENVMAP_BLENDING_ADD";break}return e}function ff(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function pf(i,e,t,n){const r=i.getContext(),a=t.defines;let s=t.vertexShader,o=t.fragmentShader;const l=cf(t),c=df(t),d=uf(t),u=hf(t),f=ff(t),h=ef(t),_=tf(a),v=r.createProgram();let m,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ui).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ui).join(`
`),p.length>0&&(p+=`
`)):(m=[Ro(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ui).join(`
`),p=[Ro(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==fn?"#define TONE_MAPPING":"",t.toneMapping!==fn?Ie.tonemapping_pars_fragment:"",t.toneMapping!==fn?jh("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ie.colorspace_pars_fragment,Jh("linearToOutputTexel",t.outputColorSpace),Qh(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ui).join(`
`)),s=Ys(s),s=To(s,t),s=Ao(s,t),o=Ys(o),o=To(o,t),o=Ao(o,t),s=Co(s),o=Co(o),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Sa?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Sa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const w=b+m+s,y=b+p+o,L=Eo(r,r.VERTEX_SHADER,w),T=Eo(r,r.FRAGMENT_SHADER,y);r.attachShader(v,L),r.attachShader(v,T),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function A(C){if(i.debug.checkShaderErrors){const Y=r.getProgramInfoLog(v).trim(),z=r.getShaderInfoLog(L).trim(),W=r.getShaderInfoLog(T).trim();let K=!0,G=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(K=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,v,L,T);else{const Q=bo(r,L,"vertex"),H=bo(r,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+Y+`
`+Q+`
`+H)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(z===""||W==="")&&(G=!1);G&&(C.diagnostics={runnable:K,programLog:Y,vertexShader:{log:z,prefix:m},fragmentShader:{log:W,prefix:p}})}r.deleteShader(L),r.deleteShader(T),D=new fr(r,v),S=nf(r,v)}let D;this.getUniforms=function(){return D===void 0&&A(this),D};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(v,$h)),M},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=qh++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=L,this.fragmentShader=T,this}let mf=0;class _f{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),a=this._getShaderStage(n),s=this._getShaderCacheForMaterial(e);return s.has(r)===!1&&(s.add(r),r.usedTimes++),s.has(a)===!1&&(s.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new gf(e),t.set(e,n)),n}}class gf{constructor(e){this.id=mf++,this.code=e,this.usedTimes=0}}function vf(i,e,t,n,r,a,s){const o=new Oa,l=new _f,c=new Set,d=[],u=r.logarithmicDepthBuffer,f=r.vertexTextures;let h=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return c.add(S),S===0?"uv":`uv${S}`}function m(S,M,C,Y,z){const W=Y.fog,K=z.geometry,G=S.isMeshStandardMaterial?Y.environment:null,Q=(S.isMeshStandardMaterial?t:e).get(S.envMap||G),H=Q&&Q.mapping===Fi?Q.image.height:null,ie=_[S.type];S.precision!==null&&(h=r.getMaxPrecision(S.precision),h!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",h,"instead."));const ce=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,xe=ce!==void 0?ce.length:0;let De=0;K.morphAttributes.position!==void 0&&(De=1),K.morphAttributes.normal!==void 0&&(De=2),K.morphAttributes.color!==void 0&&(De=3);let $e,X,ee,_e;if(ie){const Xe=qt[ie];$e=Xe.vertexShader,X=Xe.fragmentShader}else $e=S.vertexShader,X=S.fragmentShader,l.update(S),ee=l.getVertexShaderID(S),_e=l.getFragmentShaderID(S);const re=i.getRenderTarget(),Ee=i.state.buffers.depth.getReversed(),Te=z.isInstancedMesh===!0,Le=z.isBatchedMesh===!0,et=!!S.map,ze=!!S.matcap,at=!!Q,U=!!S.aoMap,Lt=!!S.lightMap,Ne=!!S.bumpMap,Fe=!!S.normalMap,Me=!!S.displacementMap,Je=!!S.emissiveMap,ye=!!S.metalnessMap,E=!!S.roughnessMap,g=S.anisotropy>0,N=S.clearcoat>0,$=S.dispersion>0,Z=S.iridescence>0,V=S.sheen>0,ge=S.transmission>0,se=g&&!!S.anisotropyMap,de=N&&!!S.clearcoatMap,ke=N&&!!S.clearcoatNormalMap,J=N&&!!S.clearcoatRoughnessMap,ue=Z&&!!S.iridescenceMap,Se=Z&&!!S.iridescenceThicknessMap,we=V&&!!S.sheenColorMap,he=V&&!!S.sheenRoughnessMap,Oe=!!S.specularMap,Pe=!!S.specularColorMap,Ze=!!S.specularIntensityMap,R=ge&&!!S.transmissionMap,ne=ge&&!!S.thicknessMap,k=!!S.gradientMap,q=!!S.alphaMap,le=S.alphaTest>0,ae=!!S.alphaHash,Ce=!!S.extensions;let nt=fn;S.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(nt=i.toneMapping);const gt={shaderID:ie,shaderType:S.type,shaderName:S.name,vertexShader:$e,fragmentShader:X,defines:S.defines,customVertexShaderID:ee,customFragmentShaderID:_e,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:h,batching:Le,batchingColor:Le&&z._colorsTexture!==null,instancing:Te,instancingColor:Te&&z.instanceColor!==null,instancingMorph:Te&&z.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:re===null?i.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:Yn,alphaToCoverage:!!S.alphaToCoverage,map:et,matcap:ze,envMap:at,envMapMode:at&&Q.mapping,envMapCubeUVHeight:H,aoMap:U,lightMap:Lt,bumpMap:Ne,normalMap:Fe,displacementMap:f&&Me,emissiveMap:Je,normalMapObjectSpace:Fe&&S.normalMapType===Wl,normalMapTangentSpace:Fe&&S.normalMapType===Vl,metalnessMap:ye,roughnessMap:E,anisotropy:g,anisotropyMap:se,clearcoat:N,clearcoatMap:de,clearcoatNormalMap:ke,clearcoatRoughnessMap:J,dispersion:$,iridescence:Z,iridescenceMap:ue,iridescenceThicknessMap:Se,sheen:V,sheenColorMap:we,sheenRoughnessMap:he,specularMap:Oe,specularColorMap:Pe,specularIntensityMap:Ze,transmission:ge,transmissionMap:R,thicknessMap:ne,gradientMap:k,opaque:S.transparent===!1&&S.blending===Xt&&S.alphaToCoverage===!1,alphaMap:q,alphaTest:le,alphaHash:ae,combine:S.combine,mapUv:et&&v(S.map.channel),aoMapUv:U&&v(S.aoMap.channel),lightMapUv:Lt&&v(S.lightMap.channel),bumpMapUv:Ne&&v(S.bumpMap.channel),normalMapUv:Fe&&v(S.normalMap.channel),displacementMapUv:Me&&v(S.displacementMap.channel),emissiveMapUv:Je&&v(S.emissiveMap.channel),metalnessMapUv:ye&&v(S.metalnessMap.channel),roughnessMapUv:E&&v(S.roughnessMap.channel),anisotropyMapUv:se&&v(S.anisotropyMap.channel),clearcoatMapUv:de&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:ke&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ue&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:Se&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:we&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:he&&v(S.sheenRoughnessMap.channel),specularMapUv:Oe&&v(S.specularMap.channel),specularColorMapUv:Pe&&v(S.specularColorMap.channel),specularIntensityMapUv:Ze&&v(S.specularIntensityMap.channel),transmissionMapUv:R&&v(S.transmissionMap.channel),thicknessMapUv:ne&&v(S.thicknessMap.channel),alphaMapUv:q&&v(S.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(Fe||g),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!K.attributes.uv&&(et||q),fog:!!W,useFog:S.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Ee,skinning:z.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:De,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:nt,decodeVideoTexture:et&&S.map.isVideoTexture===!0&&Be.getTransfer(S.map.colorSpace)===Ye,decodeVideoTextureEmissive:Je&&S.emissiveMap.isVideoTexture===!0&&Be.getTransfer(S.emissiveMap.colorSpace)===Ye,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===jt,flipSided:S.side===St,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Ce&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ce&&S.extensions.multiDraw===!0||Le)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return gt.vertexUv1s=c.has(1),gt.vertexUv2s=c.has(2),gt.vertexUv3s=c.has(3),c.clear(),gt}function p(S){const M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(const C in S.defines)M.push(C),M.push(S.defines[C]);return S.isRawShaderMaterial===!1&&(b(M,S),w(M,S),M.push(i.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function b(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function w(S,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),S.push(o.mask)}function y(S){const M=_[S.type];let C;if(M){const Y=qt[M];C=Lc.clone(Y.uniforms)}else C=S.uniforms;return C}function L(S,M){let C;for(let Y=0,z=d.length;Y<z;Y++){const W=d[Y];if(W.cacheKey===M){C=W,++C.usedTimes;break}}return C===void 0&&(C=new pf(i,M,S,a),d.push(C)),C}function T(S){if(--S.usedTimes===0){const M=d.indexOf(S);d[M]=d[d.length-1],d.pop(),S.destroy()}}function A(S){l.remove(S)}function D(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:y,acquireProgram:L,releaseProgram:T,releaseShaderCache:A,programs:d,dispose:D}}function xf(){let i=new WeakMap;function e(s){return i.has(s)}function t(s){let o=i.get(s);return o===void 0&&(o={},i.set(s,o)),o}function n(s){i.delete(s)}function r(s,o,l){i.get(s)[o]=l}function a(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:a}}function yf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Io(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Po(){const i=[];let e=0;const t=[],n=[],r=[];function a(){e=0,t.length=0,n.length=0,r.length=0}function s(u,f,h,_,v,m){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:f,material:h,groupOrder:_,renderOrder:u.renderOrder,z:v,group:m},i[e]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=h,p.groupOrder=_,p.renderOrder=u.renderOrder,p.z=v,p.group=m),e++,p}function o(u,f,h,_,v,m){const p=s(u,f,h,_,v,m);h.transmission>0?n.push(p):h.transparent===!0?r.push(p):t.push(p)}function l(u,f,h,_,v,m){const p=s(u,f,h,_,v,m);h.transmission>0?n.unshift(p):h.transparent===!0?r.unshift(p):t.unshift(p)}function c(u,f){t.length>1&&t.sort(u||yf),n.length>1&&n.sort(f||Io),r.length>1&&r.sort(f||Io)}function d(){for(let u=e,f=i.length;u<f;u++){const h=i[u];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:n,transparent:r,init:a,push:o,unshift:l,finish:d,sort:c}}function Mf(){let i=new WeakMap;function e(n,r){const a=i.get(n);let s;return a===void 0?(s=new Po,i.set(n,[s])):r>=a.length?(s=new Po,a.push(s)):s=a[r],s}function t(){i=new WeakMap}return{get:e,dispose:t}}function Sf(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new B,color:new Ge};break;case"SpotLight":t={position:new B,direction:new B,color:new Ge,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new Ge,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new Ge,groundColor:new Ge};break;case"RectAreaLight":t={color:new Ge,position:new B,halfWidth:new B,halfHeight:new B};break}return i[e.id]=t,t}}}function Ef(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let wf=0;function bf(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Tf(i){const e=new Sf,t=Ef(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new B);const r=new B,a=new rt,s=new rt;function o(c){let d=0,u=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let h=0,_=0,v=0,m=0,p=0,b=0,w=0,y=0,L=0,T=0,A=0;c.sort(bf);for(let S=0,M=c.length;S<M;S++){const C=c[S],Y=C.color,z=C.intensity,W=C.distance,K=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)d+=Y.r*z,u+=Y.g*z,f+=Y.b*z;else if(C.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(C.sh.coefficients[G],z);A++}else if(C.isDirectionalLight){const G=e.get(C);if(G.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const Q=C.shadow,H=t.get(C);H.shadowIntensity=Q.intensity,H.shadowBias=Q.bias,H.shadowNormalBias=Q.normalBias,H.shadowRadius=Q.radius,H.shadowMapSize=Q.mapSize,n.directionalShadow[h]=H,n.directionalShadowMap[h]=K,n.directionalShadowMatrix[h]=C.shadow.matrix,b++}n.directional[h]=G,h++}else if(C.isSpotLight){const G=e.get(C);G.position.setFromMatrixPosition(C.matrixWorld),G.color.copy(Y).multiplyScalar(z),G.distance=W,G.coneCos=Math.cos(C.angle),G.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),G.decay=C.decay,n.spot[v]=G;const Q=C.shadow;if(C.map&&(n.spotLightMap[L]=C.map,L++,Q.updateMatrices(C),C.castShadow&&T++),n.spotLightMatrix[v]=Q.matrix,C.castShadow){const H=t.get(C);H.shadowIntensity=Q.intensity,H.shadowBias=Q.bias,H.shadowNormalBias=Q.normalBias,H.shadowRadius=Q.radius,H.shadowMapSize=Q.mapSize,n.spotShadow[v]=H,n.spotShadowMap[v]=K,y++}v++}else if(C.isRectAreaLight){const G=e.get(C);G.color.copy(Y).multiplyScalar(z),G.halfWidth.set(C.width*.5,0,0),G.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=G,m++}else if(C.isPointLight){const G=e.get(C);if(G.color.copy(C.color).multiplyScalar(C.intensity),G.distance=C.distance,G.decay=C.decay,C.castShadow){const Q=C.shadow,H=t.get(C);H.shadowIntensity=Q.intensity,H.shadowBias=Q.bias,H.shadowNormalBias=Q.normalBias,H.shadowRadius=Q.radius,H.shadowMapSize=Q.mapSize,H.shadowCameraNear=Q.camera.near,H.shadowCameraFar=Q.camera.far,n.pointShadow[_]=H,n.pointShadowMap[_]=K,n.pointShadowMatrix[_]=C.shadow.matrix,w++}n.point[_]=G,_++}else if(C.isHemisphereLight){const G=e.get(C);G.skyColor.copy(C.color).multiplyScalar(z),G.groundColor.copy(C.groundColor).multiplyScalar(z),n.hemi[p]=G,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=te.LTC_FLOAT_1,n.rectAreaLTC2=te.LTC_FLOAT_2):(n.rectAreaLTC1=te.LTC_HALF_1,n.rectAreaLTC2=te.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=u,n.ambient[2]=f;const D=n.hash;(D.directionalLength!==h||D.pointLength!==_||D.spotLength!==v||D.rectAreaLength!==m||D.hemiLength!==p||D.numDirectionalShadows!==b||D.numPointShadows!==w||D.numSpotShadows!==y||D.numSpotMaps!==L||D.numLightProbes!==A)&&(n.directional.length=h,n.spot.length=v,n.rectArea.length=m,n.point.length=_,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=y+L-T,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=A,D.directionalLength=h,D.pointLength=_,D.spotLength=v,D.rectAreaLength=m,D.hemiLength=p,D.numDirectionalShadows=b,D.numPointShadows=w,D.numSpotShadows=y,D.numSpotMaps=L,D.numLightProbes=A,n.version=wf++)}function l(c,d){let u=0,f=0,h=0,_=0,v=0;const m=d.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){const w=c[p];if(w.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),u++}else if(w.isSpotLight){const y=n.spot[h];y.position.setFromMatrixPosition(w.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),h++}else if(w.isRectAreaLight){const y=n.rectArea[_];y.position.setFromMatrixPosition(w.matrixWorld),y.position.applyMatrix4(m),s.identity(),a.copy(w.matrixWorld),a.premultiply(m),s.extractRotation(a),y.halfWidth.set(w.width*.5,0,0),y.halfHeight.set(0,w.height*.5,0),y.halfWidth.applyMatrix4(s),y.halfHeight.applyMatrix4(s),_++}else if(w.isPointLight){const y=n.point[f];y.position.setFromMatrixPosition(w.matrixWorld),y.position.applyMatrix4(m),f++}else if(w.isHemisphereLight){const y=n.hemi[v];y.direction.setFromMatrixPosition(w.matrixWorld),y.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function Uo(i){const e=new Tf(i),t=[],n=[];function r(d){c.camera=d,t.length=0,n.length=0}function a(d){t.push(d)}function s(d){n.push(d)}function o(){e.setup(t)}function l(d){e.setupView(t,d)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:a,pushShadow:s}}function Af(i){let e=new WeakMap;function t(r,a=0){const s=e.get(r);let o;return s===void 0?(o=new Uo(i),e.set(r,[o])):a>=s.length?(o=new Uo(i),s.push(o)):o=s[a],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class Cf extends Ci{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Hl,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Rf extends Ci{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const If=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Pf=`uniform sampler2D shadow_pass;
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
}`;function Uf(i,e,t){let n=new to;const r=new Ue,a=new Ue,s=new it,o=new Cf({depthPacking:Gl}),l=new Rf,c={},d=t.maxTextureSize,u={[un]:St,[St]:un,[jt]:jt},f=new ht({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ue},radius:{value:4}},vertexShader:If,fragmentShader:Pf}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const _=new Dt;_.setAttribute("position",new wt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new st(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ra;let p=this.type;this.render=function(T,A,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const S=i.getRenderTarget(),M=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),Y=i.state;Y.setBlending(hn),Y.buffers.color.setClear(1,1,1,1),Y.buffers.depth.setTest(!0),Y.setScissorTest(!1);const z=p!==Jt&&this.type===Jt,W=p===Jt&&this.type!==Jt;for(let K=0,G=T.length;K<G;K++){const Q=T[K],H=Q.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const ie=H.getFrameExtents();if(r.multiply(ie),a.copy(H.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(a.x=Math.floor(d/ie.x),r.x=a.x*ie.x,H.mapSize.x=a.x),r.y>d&&(a.y=Math.floor(d/ie.y),r.y=a.y*ie.y,H.mapSize.y=a.y)),H.map===null||z===!0||W===!0){const xe=this.type!==Jt?{minFilter:Ft,magFilter:Ft}:{};H.map!==null&&H.map.dispose(),H.map=new mn(r.x,r.y,xe),H.map.texture.name=Q.name+".shadowMap",H.camera.updateProjectionMatrix()}i.setRenderTarget(H.map),i.clear();const ce=H.getViewportCount();for(let xe=0;xe<ce;xe++){const De=H.getViewport(xe);s.set(a.x*De.x,a.y*De.y,a.x*De.z,a.y*De.w),Y.viewport(s),H.updateMatrices(Q,xe),n=H.getFrustum(),y(A,D,H.camera,Q,this.type)}H.isPointLightShadow!==!0&&this.type===Jt&&b(H,D),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(S,M,C)};function b(T,A){const D=e.update(v);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,h.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new mn(r.x,r.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(A,null,D,f,v,null),h.uniforms.shadow_pass.value=T.mapPass.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(A,null,D,h,v,null)}function w(T,A,D,S){let M=null;const C=D.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(C!==void 0)M=C;else if(M=D.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const Y=M.uuid,z=A.uuid;let W=c[Y];W===void 0&&(W={},c[Y]=W);let K=W[z];K===void 0&&(K=M.clone(),W[z]=K,A.addEventListener("dispose",L)),M=K}if(M.visible=A.visible,M.wireframe=A.wireframe,S===Jt?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:u[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,D.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const Y=i.properties.get(M);Y.light=D}return M}function y(T,A,D,S,M){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===Jt)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,T.matrixWorld);const z=e.update(T),W=T.material;if(Array.isArray(W)){const K=z.groups;for(let G=0,Q=K.length;G<Q;G++){const H=K[G],ie=W[H.materialIndex];if(ie&&ie.visible){const ce=w(T,ie,S,M);T.onBeforeShadow(i,T,A,D,z,ce,H),i.renderBufferDirect(D,null,z,ce,T,H),T.onAfterShadow(i,T,A,D,z,ce,H)}}}else if(W.visible){const K=w(T,W,S,M);T.onBeforeShadow(i,T,A,D,z,K,null),i.renderBufferDirect(D,null,z,K,T,null),T.onAfterShadow(i,T,A,D,z,K,null)}}const Y=T.children;for(let z=0,W=Y.length;z<W;z++)y(Y[z],A,D,S,M)}function L(T){T.target.removeEventListener("dispose",L);for(const D in c){const S=c[D],M=T.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}const Df={[Ar]:Cr,[Rr]:Ur,[Ir]:Dr,[kn]:Pr,[Cr]:Ar,[Ur]:Rr,[Dr]:Ir,[Pr]:kn};function Lf(i,e){function t(){let R=!1;const ne=new it;let k=null;const q=new it(0,0,0,0);return{setMask:function(le){k!==le&&!R&&(i.colorMask(le,le,le,le),k=le)},setLocked:function(le){R=le},setClear:function(le,ae,Ce,nt,gt){gt===!0&&(le*=nt,ae*=nt,Ce*=nt),ne.set(le,ae,Ce,nt),q.equals(ne)===!1&&(i.clearColor(le,ae,Ce,nt),q.copy(ne))},reset:function(){R=!1,k=null,q.set(-1,0,0,0)}}}function n(){let R=!1,ne=!1,k=null,q=null,le=null;return{setReversed:function(ae){if(ne!==ae){const Ce=e.get("EXT_clip_control");ne?Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.ZERO_TO_ONE_EXT):Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.NEGATIVE_ONE_TO_ONE_EXT);const nt=le;le=null,this.setClear(nt)}ne=ae},getReversed:function(){return ne},setTest:function(ae){ae?re(i.DEPTH_TEST):Ee(i.DEPTH_TEST)},setMask:function(ae){k!==ae&&!R&&(i.depthMask(ae),k=ae)},setFunc:function(ae){if(ne&&(ae=Df[ae]),q!==ae){switch(ae){case Ar:i.depthFunc(i.NEVER);break;case Cr:i.depthFunc(i.ALWAYS);break;case Rr:i.depthFunc(i.LESS);break;case kn:i.depthFunc(i.LEQUAL);break;case Ir:i.depthFunc(i.EQUAL);break;case Pr:i.depthFunc(i.GEQUAL);break;case Ur:i.depthFunc(i.GREATER);break;case Dr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}q=ae}},setLocked:function(ae){R=ae},setClear:function(ae){le!==ae&&(ne&&(ae=1-ae),i.clearDepth(ae),le=ae)},reset:function(){R=!1,k=null,q=null,le=null,ne=!1}}}function r(){let R=!1,ne=null,k=null,q=null,le=null,ae=null,Ce=null,nt=null,gt=null;return{setTest:function(Xe){R||(Xe?re(i.STENCIL_TEST):Ee(i.STENCIL_TEST))},setMask:function(Xe){ne!==Xe&&!R&&(i.stencilMask(Xe),ne=Xe)},setFunc:function(Xe,Vt,cn){(k!==Xe||q!==Vt||le!==cn)&&(i.stencilFunc(Xe,Vt,cn),k=Xe,q=Vt,le=cn)},setOp:function(Xe,Vt,cn){(ae!==Xe||Ce!==Vt||nt!==cn)&&(i.stencilOp(Xe,Vt,cn),ae=Xe,Ce=Vt,nt=cn)},setLocked:function(Xe){R=Xe},setClear:function(Xe){gt!==Xe&&(i.clearStencil(Xe),gt=Xe)},reset:function(){R=!1,ne=null,k=null,q=null,le=null,ae=null,Ce=null,nt=null,gt=null}}}const a=new t,s=new n,o=new r,l=new WeakMap,c=new WeakMap;let d={},u={},f=new WeakMap,h=[],_=null,v=!1,m=null,p=null,b=null,w=null,y=null,L=null,T=null,A=new Ge(0,0,0),D=0,S=!1,M=null,C=null,Y=null,z=null,W=null;const K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,Q=0;const H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(H)[1]),G=Q>=1):H.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),G=Q>=2);let ie=null,ce={};const xe=i.getParameter(i.SCISSOR_BOX),De=i.getParameter(i.VIEWPORT),$e=new it().fromArray(xe),X=new it().fromArray(De);function ee(R,ne,k,q){const le=new Uint8Array(4),ae=i.createTexture();i.bindTexture(R,ae),i.texParameteri(R,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(R,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ce=0;Ce<k;Ce++)R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY?i.texImage3D(ne,0,i.RGBA,1,1,q,0,i.RGBA,i.UNSIGNED_BYTE,le):i.texImage2D(ne+Ce,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,le);return ae}const _e={};_e[i.TEXTURE_2D]=ee(i.TEXTURE_2D,i.TEXTURE_2D,1),_e[i.TEXTURE_CUBE_MAP]=ee(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),_e[i.TEXTURE_2D_ARRAY]=ee(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),_e[i.TEXTURE_3D]=ee(i.TEXTURE_3D,i.TEXTURE_3D,1,1),a.setClear(0,0,0,1),s.setClear(1),o.setClear(0),re(i.DEPTH_TEST),s.setFunc(kn),Ne(!1),Fe(ia),re(i.CULL_FACE),U(hn);function re(R){d[R]!==!0&&(i.enable(R),d[R]=!0)}function Ee(R){d[R]!==!1&&(i.disable(R),d[R]=!1)}function Te(R,ne){return u[R]!==ne?(i.bindFramebuffer(R,ne),u[R]=ne,R===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ne),R===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ne),!0):!1}function Le(R,ne){let k=h,q=!1;if(R){k=f.get(ne),k===void 0&&(k=[],f.set(ne,k));const le=R.textures;if(k.length!==le.length||k[0]!==i.COLOR_ATTACHMENT0){for(let ae=0,Ce=le.length;ae<Ce;ae++)k[ae]=i.COLOR_ATTACHMENT0+ae;k.length=le.length,q=!0}}else k[0]!==i.BACK&&(k[0]=i.BACK,q=!0);q&&i.drawBuffers(k)}function et(R){return _!==R?(i.useProgram(R),_=R,!0):!1}const ze={[wn]:i.FUNC_ADD,[pl]:i.FUNC_SUBTRACT,[ml]:i.FUNC_REVERSE_SUBTRACT};ze[_l]=i.MIN,ze[gl]=i.MAX;const at={[vl]:i.ZERO,[xl]:i.ONE,[yl]:i.SRC_COLOR,[br]:i.SRC_ALPHA,[Tl]:i.SRC_ALPHA_SATURATE,[wl]:i.DST_COLOR,[Sl]:i.DST_ALPHA,[Ml]:i.ONE_MINUS_SRC_COLOR,[Tr]:i.ONE_MINUS_SRC_ALPHA,[bl]:i.ONE_MINUS_DST_COLOR,[El]:i.ONE_MINUS_DST_ALPHA,[Al]:i.CONSTANT_COLOR,[Cl]:i.ONE_MINUS_CONSTANT_COLOR,[Rl]:i.CONSTANT_ALPHA,[Il]:i.ONE_MINUS_CONSTANT_ALPHA};function U(R,ne,k,q,le,ae,Ce,nt,gt,Xe){if(R===hn){v===!0&&(Ee(i.BLEND),v=!1);return}if(v===!1&&(re(i.BLEND),v=!0),R!==fl){if(R!==m||Xe!==S){if((p!==wn||y!==wn)&&(i.blendEquation(i.FUNC_ADD),p=wn,y=wn),Xe)switch(R){case Xt:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Yt:i.blendFunc(i.ONE,i.ONE);break;case sa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case aa:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case Xt:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Yt:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case sa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case aa:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}b=null,w=null,L=null,T=null,A.set(0,0,0),D=0,m=R,S=Xe}return}le=le||ne,ae=ae||k,Ce=Ce||q,(ne!==p||le!==y)&&(i.blendEquationSeparate(ze[ne],ze[le]),p=ne,y=le),(k!==b||q!==w||ae!==L||Ce!==T)&&(i.blendFuncSeparate(at[k],at[q],at[ae],at[Ce]),b=k,w=q,L=ae,T=Ce),(nt.equals(A)===!1||gt!==D)&&(i.blendColor(nt.r,nt.g,nt.b,gt),A.copy(nt),D=gt),m=R,S=!1}function Lt(R,ne){R.side===jt?Ee(i.CULL_FACE):re(i.CULL_FACE);let k=R.side===St;ne&&(k=!k),Ne(k),R.blending===Xt&&R.transparent===!1?U(hn):U(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),s.setFunc(R.depthFunc),s.setTest(R.depthTest),s.setMask(R.depthWrite),a.setMask(R.colorWrite);const q=R.stencilWrite;o.setTest(q),q&&(o.setMask(R.stencilWriteMask),o.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),o.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),Je(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?re(i.SAMPLE_ALPHA_TO_COVERAGE):Ee(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ne(R){M!==R&&(R?i.frontFace(i.CW):i.frontFace(i.CCW),M=R)}function Fe(R){R!==dl?(re(i.CULL_FACE),R!==C&&(R===ia?i.cullFace(i.BACK):R===ul?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ee(i.CULL_FACE),C=R}function Me(R){R!==Y&&(G&&i.lineWidth(R),Y=R)}function Je(R,ne,k){R?(re(i.POLYGON_OFFSET_FILL),(z!==ne||W!==k)&&(i.polygonOffset(ne,k),z=ne,W=k)):Ee(i.POLYGON_OFFSET_FILL)}function ye(R){R?re(i.SCISSOR_TEST):Ee(i.SCISSOR_TEST)}function E(R){R===void 0&&(R=i.TEXTURE0+K-1),ie!==R&&(i.activeTexture(R),ie=R)}function g(R,ne,k){k===void 0&&(ie===null?k=i.TEXTURE0+K-1:k=ie);let q=ce[k];q===void 0&&(q={type:void 0,texture:void 0},ce[k]=q),(q.type!==R||q.texture!==ne)&&(ie!==k&&(i.activeTexture(k),ie=k),i.bindTexture(R,ne||_e[R]),q.type=R,q.texture=ne)}function N(){const R=ce[ie];R!==void 0&&R.type!==void 0&&(i.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function $(){try{i.compressedTexImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Z(){try{i.compressedTexImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function V(){try{i.texSubImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ge(){try{i.texSubImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function se(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function de(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ke(){try{i.texStorage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function J(){try{i.texStorage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ue(){try{i.texImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Se(){try{i.texImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function we(R){$e.equals(R)===!1&&(i.scissor(R.x,R.y,R.z,R.w),$e.copy(R))}function he(R){X.equals(R)===!1&&(i.viewport(R.x,R.y,R.z,R.w),X.copy(R))}function Oe(R,ne){let k=c.get(ne);k===void 0&&(k=new WeakMap,c.set(ne,k));let q=k.get(R);q===void 0&&(q=i.getUniformBlockIndex(ne,R.name),k.set(R,q))}function Pe(R,ne){const q=c.get(ne).get(R);l.get(ne)!==q&&(i.uniformBlockBinding(ne,q,R.__bindingPointIndex),l.set(ne,q))}function Ze(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),s.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},ie=null,ce={},u={},f=new WeakMap,h=[],_=null,v=!1,m=null,p=null,b=null,w=null,y=null,L=null,T=null,A=new Ge(0,0,0),D=0,S=!1,M=null,C=null,Y=null,z=null,W=null,$e.set(0,0,i.canvas.width,i.canvas.height),X.set(0,0,i.canvas.width,i.canvas.height),a.reset(),s.reset(),o.reset()}return{buffers:{color:a,depth:s,stencil:o},enable:re,disable:Ee,bindFramebuffer:Te,drawBuffers:Le,useProgram:et,setBlending:U,setMaterial:Lt,setFlipSided:Ne,setCullFace:Fe,setLineWidth:Me,setPolygonOffset:Je,setScissorTest:ye,activeTexture:E,bindTexture:g,unbindTexture:N,compressedTexImage2D:$,compressedTexImage3D:Z,texImage2D:ue,texImage3D:Se,updateUBOMapping:Oe,uniformBlockBinding:Pe,texStorage2D:ke,texStorage3D:J,texSubImage2D:V,texSubImage3D:ge,compressedTexSubImage2D:se,compressedTexSubImage3D:de,scissor:we,viewport:he,reset:Ze}}function Do(i,e,t,n){const r=Nf(n);switch(t){case ha:return i*e;case pa:return i*e;case ma:return i*e*2;case _a:return i*e/r.components*r.byteLength;case Gr:return i*e/r.components*r.byteLength;case ga:return i*e*2/r.components*r.byteLength;case Vr:return i*e*2/r.components*r.byteLength;case fa:return i*e*3/r.components*r.byteLength;case It:return i*e*4/r.components*r.byteLength;case Wr:return i*e*4/r.components*r.byteLength;case Bi:case zi:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ki:case Hi:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Yr:case qr:return Math.max(i,16)*Math.max(e,8)/4;case Xr:case $r:return Math.max(i,8)*Math.max(e,8)/2;case Zr:case Kr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Jr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case jr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Qr:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case es:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ts:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ns:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case is:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case rs:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ss:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case as:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case os:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ls:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case cs:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ds:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case us:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Gi:case hs:case fs:return Math.ceil(i/4)*Math.ceil(e/4)*16;case va:case ps:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ms:case _s:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Nf(i){switch(i){case $t:case ca:return{byteLength:1,components:1};case gi:case da:case vi:return{byteLength:2,components:1};case kr:case Hr:return{byteLength:2,components:4};case An:case zr:case Qt:return{byteLength:4,components:1};case ua:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Ff(i,e,t,n,r,a,s){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ue,d=new WeakMap;let u;const f=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(E,g){return h?new OffscreenCanvas(E,g):Xi("canvas")}function v(E,g,N){let $=1;const Z=ye(E);if((Z.width>N||Z.height>N)&&($=N/Math.max(Z.width,Z.height)),$<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const V=Math.floor($*Z.width),ge=Math.floor($*Z.height);u===void 0&&(u=_(V,ge));const se=g?_(V,ge):u;return se.width=V,se.height=ge,se.getContext("2d").drawImage(E,0,0,V,ge),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+V+"x"+ge+")."),se}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),E;return E}function m(E){return E.generateMipmaps}function p(E){i.generateMipmap(E)}function b(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function w(E,g,N,$,Z=!1){if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let V=g;if(g===i.RED&&(N===i.FLOAT&&(V=i.R32F),N===i.HALF_FLOAT&&(V=i.R16F),N===i.UNSIGNED_BYTE&&(V=i.R8)),g===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&(V=i.R8UI),N===i.UNSIGNED_SHORT&&(V=i.R16UI),N===i.UNSIGNED_INT&&(V=i.R32UI),N===i.BYTE&&(V=i.R8I),N===i.SHORT&&(V=i.R16I),N===i.INT&&(V=i.R32I)),g===i.RG&&(N===i.FLOAT&&(V=i.RG32F),N===i.HALF_FLOAT&&(V=i.RG16F),N===i.UNSIGNED_BYTE&&(V=i.RG8)),g===i.RG_INTEGER&&(N===i.UNSIGNED_BYTE&&(V=i.RG8UI),N===i.UNSIGNED_SHORT&&(V=i.RG16UI),N===i.UNSIGNED_INT&&(V=i.RG32UI),N===i.BYTE&&(V=i.RG8I),N===i.SHORT&&(V=i.RG16I),N===i.INT&&(V=i.RG32I)),g===i.RGB_INTEGER&&(N===i.UNSIGNED_BYTE&&(V=i.RGB8UI),N===i.UNSIGNED_SHORT&&(V=i.RGB16UI),N===i.UNSIGNED_INT&&(V=i.RGB32UI),N===i.BYTE&&(V=i.RGB8I),N===i.SHORT&&(V=i.RGB16I),N===i.INT&&(V=i.RGB32I)),g===i.RGBA_INTEGER&&(N===i.UNSIGNED_BYTE&&(V=i.RGBA8UI),N===i.UNSIGNED_SHORT&&(V=i.RGBA16UI),N===i.UNSIGNED_INT&&(V=i.RGBA32UI),N===i.BYTE&&(V=i.RGBA8I),N===i.SHORT&&(V=i.RGBA16I),N===i.INT&&(V=i.RGBA32I)),g===i.RGB&&N===i.UNSIGNED_INT_5_9_9_9_REV&&(V=i.RGB9_E5),g===i.RGBA){const ge=Z?Vi:Be.getTransfer($);N===i.FLOAT&&(V=i.RGBA32F),N===i.HALF_FLOAT&&(V=i.RGBA16F),N===i.UNSIGNED_BYTE&&(V=ge===Ye?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT_4_4_4_4&&(V=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&(V=i.RGB5_A1)}return(V===i.R16F||V===i.R32F||V===i.RG16F||V===i.RG32F||V===i.RGBA16F||V===i.RGBA32F)&&e.get("EXT_color_buffer_float"),V}function y(E,g){let N;return E?g===null||g===An||g===Vn?N=i.DEPTH24_STENCIL8:g===Qt?N=i.DEPTH32F_STENCIL8:g===gi&&(N=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===An||g===Vn?N=i.DEPTH_COMPONENT24:g===Qt?N=i.DEPTH_COMPONENT32F:g===gi&&(N=i.DEPTH_COMPONENT16),N}function L(E,g){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==Ft&&E.minFilter!==ft?Math.log2(Math.max(g.width,g.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?g.mipmaps.length:1}function T(E){const g=E.target;g.removeEventListener("dispose",T),D(g),g.isVideoTexture&&d.delete(g)}function A(E){const g=E.target;g.removeEventListener("dispose",A),M(g)}function D(E){const g=n.get(E);if(g.__webglInit===void 0)return;const N=E.source,$=f.get(N);if($){const Z=$[g.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&S(E),Object.keys($).length===0&&f.delete(N)}n.remove(E)}function S(E){const g=n.get(E);i.deleteTexture(g.__webglTexture);const N=E.source,$=f.get(N);delete $[g.__cacheKey],s.memory.textures--}function M(E){const g=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(g.__webglFramebuffer[$]))for(let Z=0;Z<g.__webglFramebuffer[$].length;Z++)i.deleteFramebuffer(g.__webglFramebuffer[$][Z]);else i.deleteFramebuffer(g.__webglFramebuffer[$]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[$])}else{if(Array.isArray(g.__webglFramebuffer))for(let $=0;$<g.__webglFramebuffer.length;$++)i.deleteFramebuffer(g.__webglFramebuffer[$]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let $=0;$<g.__webglColorRenderbuffer.length;$++)g.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[$]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const N=E.textures;for(let $=0,Z=N.length;$<Z;$++){const V=n.get(N[$]);V.__webglTexture&&(i.deleteTexture(V.__webglTexture),s.memory.textures--),n.remove(N[$])}n.remove(E)}let C=0;function Y(){C=0}function z(){const E=C;return E>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+r.maxTextures),C+=1,E}function W(E){const g=[];return g.push(E.wrapS),g.push(E.wrapT),g.push(E.wrapR||0),g.push(E.magFilter),g.push(E.minFilter),g.push(E.anisotropy),g.push(E.internalFormat),g.push(E.format),g.push(E.type),g.push(E.generateMipmaps),g.push(E.premultiplyAlpha),g.push(E.flipY),g.push(E.unpackAlignment),g.push(E.colorSpace),g.join()}function K(E,g){const N=n.get(E);if(E.isVideoTexture&&Me(E),E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){const $=E.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(N,E,g);return}}t.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+g)}function G(E,g){const N=n.get(E);if(E.version>0&&N.__version!==E.version){X(N,E,g);return}t.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+g)}function Q(E,g){const N=n.get(E);if(E.version>0&&N.__version!==E.version){X(N,E,g);return}t.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+g)}function H(E,g){const N=n.get(E);if(E.version>0&&N.__version!==E.version){ee(N,E,g);return}t.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+g)}const ie={[Fr]:i.REPEAT,[bn]:i.CLAMP_TO_EDGE,[Or]:i.MIRRORED_REPEAT},ce={[Ft]:i.NEAREST,[kl]:i.NEAREST_MIPMAP_NEAREST,[Oi]:i.NEAREST_MIPMAP_LINEAR,[ft]:i.LINEAR,[Br]:i.LINEAR_MIPMAP_NEAREST,[Tn]:i.LINEAR_MIPMAP_LINEAR},xe={[Xl]:i.NEVER,[Jl]:i.ALWAYS,[Yl]:i.LESS,[ya]:i.LEQUAL,[$l]:i.EQUAL,[Kl]:i.GEQUAL,[ql]:i.GREATER,[Zl]:i.NOTEQUAL};function De(E,g){if(g.type===Qt&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===ft||g.magFilter===Br||g.magFilter===Oi||g.magFilter===Tn||g.minFilter===ft||g.minFilter===Br||g.minFilter===Oi||g.minFilter===Tn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,ie[g.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,ie[g.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,ie[g.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,ce[g.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,ce[g.minFilter]),g.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,xe[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Ft||g.minFilter!==Oi&&g.minFilter!==Tn||g.type===Qt&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){const N=e.get("EXT_texture_filter_anisotropic");i.texParameterf(E,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,r.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function $e(E,g){let N=!1;E.__webglInit===void 0&&(E.__webglInit=!0,g.addEventListener("dispose",T));const $=g.source;let Z=f.get($);Z===void 0&&(Z={},f.set($,Z));const V=W(g);if(V!==E.__cacheKey){Z[V]===void 0&&(Z[V]={texture:i.createTexture(),usedTimes:0},s.memory.textures++,N=!0),Z[V].usedTimes++;const ge=Z[E.__cacheKey];ge!==void 0&&(Z[E.__cacheKey].usedTimes--,ge.usedTimes===0&&S(g)),E.__cacheKey=V,E.__webglTexture=Z[V].texture}return N}function X(E,g,N){let $=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&($=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&($=i.TEXTURE_3D);const Z=$e(E,g),V=g.source;t.bindTexture($,E.__webglTexture,i.TEXTURE0+N);const ge=n.get(V);if(V.version!==ge.__version||Z===!0){t.activeTexture(i.TEXTURE0+N);const se=Be.getPrimaries(Be.workingColorSpace),de=g.colorSpace===pn?null:Be.getPrimaries(g.colorSpace),ke=g.colorSpace===pn||se===de?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ke);let J=v(g.image,!1,r.maxTextureSize);J=Je(g,J);const ue=a.convert(g.format,g.colorSpace),Se=a.convert(g.type);let we=w(g.internalFormat,ue,Se,g.colorSpace,g.isVideoTexture);De($,g);let he;const Oe=g.mipmaps,Pe=g.isVideoTexture!==!0,Ze=ge.__version===void 0||Z===!0,R=V.dataReady,ne=L(g,J);if(g.isDepthTexture)we=y(g.format===Xn,g.type),Ze&&(Pe?t.texStorage2D(i.TEXTURE_2D,1,we,J.width,J.height):t.texImage2D(i.TEXTURE_2D,0,we,J.width,J.height,0,ue,Se,null));else if(g.isDataTexture)if(Oe.length>0){Pe&&Ze&&t.texStorage2D(i.TEXTURE_2D,ne,we,Oe[0].width,Oe[0].height);for(let k=0,q=Oe.length;k<q;k++)he=Oe[k],Pe?R&&t.texSubImage2D(i.TEXTURE_2D,k,0,0,he.width,he.height,ue,Se,he.data):t.texImage2D(i.TEXTURE_2D,k,we,he.width,he.height,0,ue,Se,he.data);g.generateMipmaps=!1}else Pe?(Ze&&t.texStorage2D(i.TEXTURE_2D,ne,we,J.width,J.height),R&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,J.width,J.height,ue,Se,J.data)):t.texImage2D(i.TEXTURE_2D,0,we,J.width,J.height,0,ue,Se,J.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Pe&&Ze&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ne,we,Oe[0].width,Oe[0].height,J.depth);for(let k=0,q=Oe.length;k<q;k++)if(he=Oe[k],g.format!==It)if(ue!==null)if(Pe){if(R)if(g.layerUpdates.size>0){const le=Do(he.width,he.height,g.format,g.type);for(const ae of g.layerUpdates){const Ce=he.data.subarray(ae*le/he.data.BYTES_PER_ELEMENT,(ae+1)*le/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,k,0,0,ae,he.width,he.height,1,ue,Ce)}g.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,k,0,0,0,he.width,he.height,J.depth,ue,he.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,k,we,he.width,he.height,J.depth,0,he.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Pe?R&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,k,0,0,0,he.width,he.height,J.depth,ue,Se,he.data):t.texImage3D(i.TEXTURE_2D_ARRAY,k,we,he.width,he.height,J.depth,0,ue,Se,he.data)}else{Pe&&Ze&&t.texStorage2D(i.TEXTURE_2D,ne,we,Oe[0].width,Oe[0].height);for(let k=0,q=Oe.length;k<q;k++)he=Oe[k],g.format!==It?ue!==null?Pe?R&&t.compressedTexSubImage2D(i.TEXTURE_2D,k,0,0,he.width,he.height,ue,he.data):t.compressedTexImage2D(i.TEXTURE_2D,k,we,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Pe?R&&t.texSubImage2D(i.TEXTURE_2D,k,0,0,he.width,he.height,ue,Se,he.data):t.texImage2D(i.TEXTURE_2D,k,we,he.width,he.height,0,ue,Se,he.data)}else if(g.isDataArrayTexture)if(Pe){if(Ze&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ne,we,J.width,J.height,J.depth),R)if(g.layerUpdates.size>0){const k=Do(J.width,J.height,g.format,g.type);for(const q of g.layerUpdates){const le=J.data.subarray(q*k/J.data.BYTES_PER_ELEMENT,(q+1)*k/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,q,J.width,J.height,1,ue,Se,le)}g.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,ue,Se,J.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,we,J.width,J.height,J.depth,0,ue,Se,J.data);else if(g.isData3DTexture)Pe?(Ze&&t.texStorage3D(i.TEXTURE_3D,ne,we,J.width,J.height,J.depth),R&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,ue,Se,J.data)):t.texImage3D(i.TEXTURE_3D,0,we,J.width,J.height,J.depth,0,ue,Se,J.data);else if(g.isFramebufferTexture){if(Ze)if(Pe)t.texStorage2D(i.TEXTURE_2D,ne,we,J.width,J.height);else{let k=J.width,q=J.height;for(let le=0;le<ne;le++)t.texImage2D(i.TEXTURE_2D,le,we,k,q,0,ue,Se,null),k>>=1,q>>=1}}else if(Oe.length>0){if(Pe&&Ze){const k=ye(Oe[0]);t.texStorage2D(i.TEXTURE_2D,ne,we,k.width,k.height)}for(let k=0,q=Oe.length;k<q;k++)he=Oe[k],Pe?R&&t.texSubImage2D(i.TEXTURE_2D,k,0,0,ue,Se,he):t.texImage2D(i.TEXTURE_2D,k,we,ue,Se,he);g.generateMipmaps=!1}else if(Pe){if(Ze){const k=ye(J);t.texStorage2D(i.TEXTURE_2D,ne,we,k.width,k.height)}R&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ue,Se,J)}else t.texImage2D(i.TEXTURE_2D,0,we,ue,Se,J);m(g)&&p($),ge.__version=V.version,g.onUpdate&&g.onUpdate(g)}E.__version=g.version}function ee(E,g,N){if(g.image.length!==6)return;const $=$e(E,g),Z=g.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+N);const V=n.get(Z);if(Z.version!==V.__version||$===!0){t.activeTexture(i.TEXTURE0+N);const ge=Be.getPrimaries(Be.workingColorSpace),se=g.colorSpace===pn?null:Be.getPrimaries(g.colorSpace),de=g.colorSpace===pn||ge===se?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const ke=g.isCompressedTexture||g.image[0].isCompressedTexture,J=g.image[0]&&g.image[0].isDataTexture,ue=[];for(let q=0;q<6;q++)!ke&&!J?ue[q]=v(g.image[q],!0,r.maxCubemapSize):ue[q]=J?g.image[q].image:g.image[q],ue[q]=Je(g,ue[q]);const Se=ue[0],we=a.convert(g.format,g.colorSpace),he=a.convert(g.type),Oe=w(g.internalFormat,we,he,g.colorSpace),Pe=g.isVideoTexture!==!0,Ze=V.__version===void 0||$===!0,R=Z.dataReady;let ne=L(g,Se);De(i.TEXTURE_CUBE_MAP,g);let k;if(ke){Pe&&Ze&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ne,Oe,Se.width,Se.height);for(let q=0;q<6;q++){k=ue[q].mipmaps;for(let le=0;le<k.length;le++){const ae=k[le];g.format!==It?we!==null?Pe?R&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,le,0,0,ae.width,ae.height,we,ae.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,le,Oe,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Pe?R&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,le,0,0,ae.width,ae.height,we,he,ae.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,le,Oe,ae.width,ae.height,0,we,he,ae.data)}}}else{if(k=g.mipmaps,Pe&&Ze){k.length>0&&ne++;const q=ye(ue[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ne,Oe,q.width,q.height)}for(let q=0;q<6;q++)if(J){Pe?R&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,ue[q].width,ue[q].height,we,he,ue[q].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Oe,ue[q].width,ue[q].height,0,we,he,ue[q].data);for(let le=0;le<k.length;le++){const Ce=k[le].image[q].image;Pe?R&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,le+1,0,0,Ce.width,Ce.height,we,he,Ce.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,le+1,Oe,Ce.width,Ce.height,0,we,he,Ce.data)}}else{Pe?R&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,we,he,ue[q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Oe,we,he,ue[q]);for(let le=0;le<k.length;le++){const ae=k[le];Pe?R&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,le+1,0,0,we,he,ae.image[q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,le+1,Oe,we,he,ae.image[q])}}}m(g)&&p(i.TEXTURE_CUBE_MAP),V.__version=Z.version,g.onUpdate&&g.onUpdate(g)}E.__version=g.version}function _e(E,g,N,$,Z,V){const ge=a.convert(N.format,N.colorSpace),se=a.convert(N.type),de=w(N.internalFormat,ge,se,N.colorSpace),ke=n.get(g),J=n.get(N);if(J.__renderTarget=g,!ke.__hasExternalTextures){const ue=Math.max(1,g.width>>V),Se=Math.max(1,g.height>>V);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,V,de,ue,Se,g.depth,0,ge,se,null):t.texImage2D(Z,V,de,ue,Se,0,ge,se,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),Fe(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,Z,J.__webglTexture,0,Ne(g)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,$,Z,J.__webglTexture,V),t.bindFramebuffer(i.FRAMEBUFFER,null)}function re(E,g,N){if(i.bindRenderbuffer(i.RENDERBUFFER,E),g.depthBuffer){const $=g.depthTexture,Z=$&&$.isDepthTexture?$.type:null,V=y(g.stencilBuffer,Z),ge=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,se=Ne(g);Fe(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,se,V,g.width,g.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,se,V,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,V,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ge,i.RENDERBUFFER,E)}else{const $=g.textures;for(let Z=0;Z<$.length;Z++){const V=$[Z],ge=a.convert(V.format,V.colorSpace),se=a.convert(V.type),de=w(V.internalFormat,ge,se,V.colorSpace),ke=Ne(g);N&&Fe(g)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ke,de,g.width,g.height):Fe(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ke,de,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,de,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ee(E,g){if(g&&g.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=n.get(g.depthTexture);$.__renderTarget=g,(!$.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),K(g.depthTexture,0);const Z=$.__webglTexture,V=Ne(g);if(g.depthTexture.format===Wn)Fe(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0,V):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0);else if(g.depthTexture.format===Xn)Fe(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0,V):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Te(E){const g=n.get(E),N=E.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==E.depthTexture){const $=E.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),$){const Z=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,$.removeEventListener("dispose",Z)};$.addEventListener("dispose",Z),g.__depthDisposeCallback=Z}g.__boundDepthTexture=$}if(E.depthTexture&&!g.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");Ee(g.__webglFramebuffer,E)}else if(N){g.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[$]),g.__webglDepthbuffer[$]===void 0)g.__webglDepthbuffer[$]=i.createRenderbuffer(),re(g.__webglDepthbuffer[$],E,!1);else{const Z=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,V=g.__webglDepthbuffer[$];i.bindRenderbuffer(i.RENDERBUFFER,V),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,V)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),re(g.__webglDepthbuffer,E,!1);else{const $=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,Z)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Le(E,g,N){const $=n.get(E);g!==void 0&&_e($.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&Te(E)}function et(E){const g=E.texture,N=n.get(E),$=n.get(g);E.addEventListener("dispose",A);const Z=E.textures,V=E.isWebGLCubeRenderTarget===!0,ge=Z.length>1;if(ge||($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=g.version,s.memory.textures++),V){N.__webglFramebuffer=[];for(let se=0;se<6;se++)if(g.mipmaps&&g.mipmaps.length>0){N.__webglFramebuffer[se]=[];for(let de=0;de<g.mipmaps.length;de++)N.__webglFramebuffer[se][de]=i.createFramebuffer()}else N.__webglFramebuffer[se]=i.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){N.__webglFramebuffer=[];for(let se=0;se<g.mipmaps.length;se++)N.__webglFramebuffer[se]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(ge)for(let se=0,de=Z.length;se<de;se++){const ke=n.get(Z[se]);ke.__webglTexture===void 0&&(ke.__webglTexture=i.createTexture(),s.memory.textures++)}if(E.samples>0&&Fe(E)===!1){N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let se=0;se<Z.length;se++){const de=Z[se];N.__webglColorRenderbuffer[se]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[se]);const ke=a.convert(de.format,de.colorSpace),J=a.convert(de.type),ue=w(de.internalFormat,ke,J,de.colorSpace,E.isXRRenderTarget===!0),Se=Ne(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,Se,ue,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+se,i.RENDERBUFFER,N.__webglColorRenderbuffer[se])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),re(N.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(V){t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),De(i.TEXTURE_CUBE_MAP,g);for(let se=0;se<6;se++)if(g.mipmaps&&g.mipmaps.length>0)for(let de=0;de<g.mipmaps.length;de++)_e(N.__webglFramebuffer[se][de],E,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+se,de);else _e(N.__webglFramebuffer[se],E,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);m(g)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ge){for(let se=0,de=Z.length;se<de;se++){const ke=Z[se],J=n.get(ke);t.bindTexture(i.TEXTURE_2D,J.__webglTexture),De(i.TEXTURE_2D,ke),_e(N.__webglFramebuffer,E,ke,i.COLOR_ATTACHMENT0+se,i.TEXTURE_2D,0),m(ke)&&p(i.TEXTURE_2D)}t.unbindTexture()}else{let se=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(se=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(se,$.__webglTexture),De(se,g),g.mipmaps&&g.mipmaps.length>0)for(let de=0;de<g.mipmaps.length;de++)_e(N.__webglFramebuffer[de],E,g,i.COLOR_ATTACHMENT0,se,de);else _e(N.__webglFramebuffer,E,g,i.COLOR_ATTACHMENT0,se,0);m(g)&&p(se),t.unbindTexture()}E.depthBuffer&&Te(E)}function ze(E){const g=E.textures;for(let N=0,$=g.length;N<$;N++){const Z=g[N];if(m(Z)){const V=b(E),ge=n.get(Z).__webglTexture;t.bindTexture(V,ge),p(V),t.unbindTexture()}}}const at=[],U=[];function Lt(E){if(E.samples>0){if(Fe(E)===!1){const g=E.textures,N=E.width,$=E.height;let Z=i.COLOR_BUFFER_BIT;const V=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ge=n.get(E),se=g.length>1;if(se)for(let de=0;de<g.length;de++)t.bindFramebuffer(i.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ge.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let de=0;de<g.length;de++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),se){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ge.__webglColorRenderbuffer[de]);const ke=n.get(g[de]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ke,0)}i.blitFramebuffer(0,0,N,$,0,0,N,$,Z,i.NEAREST),l===!0&&(at.length=0,U.length=0,at.push(i.COLOR_ATTACHMENT0+de),E.depthBuffer&&E.resolveDepthBuffer===!1&&(at.push(V),U.push(V),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,U)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,at))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),se)for(let de=0;de<g.length;de++){t.bindFramebuffer(i.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,ge.__webglColorRenderbuffer[de]);const ke=n.get(g[de]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ge.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,ke,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){const g=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function Ne(E){return Math.min(r.maxSamples,E.samples)}function Fe(E){const g=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function Me(E){const g=s.render.frame;d.get(E)!==g&&(d.set(E,g),E.update())}function Je(E,g){const N=E.colorSpace,$=E.format,Z=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||N!==Yn&&N!==pn&&(Be.getTransfer(N)===Ye?($!==It||Z!==$t)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),g}function ye(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=Y,this.setTexture2D=K,this.setTexture2DArray=G,this.setTexture3D=Q,this.setTextureCube=H,this.rebindTextures=Le,this.setupRenderTarget=et,this.updateRenderTargetMipmap=ze,this.updateMultisampleRenderTarget=Lt,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=Fe}function Of(i,e){function t(n,r=pn){let a;const s=Be.getTransfer(r);if(n===$t)return i.UNSIGNED_BYTE;if(n===kr)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Hr)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ua)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ca)return i.BYTE;if(n===da)return i.SHORT;if(n===gi)return i.UNSIGNED_SHORT;if(n===zr)return i.INT;if(n===An)return i.UNSIGNED_INT;if(n===Qt)return i.FLOAT;if(n===vi)return i.HALF_FLOAT;if(n===ha)return i.ALPHA;if(n===fa)return i.RGB;if(n===It)return i.RGBA;if(n===pa)return i.LUMINANCE;if(n===ma)return i.LUMINANCE_ALPHA;if(n===Wn)return i.DEPTH_COMPONENT;if(n===Xn)return i.DEPTH_STENCIL;if(n===_a)return i.RED;if(n===Gr)return i.RED_INTEGER;if(n===ga)return i.RG;if(n===Vr)return i.RG_INTEGER;if(n===Wr)return i.RGBA_INTEGER;if(n===Bi||n===zi||n===ki||n===Hi)if(s===Ye)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(n===Bi)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===zi)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ki)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Hi)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(n===Bi)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===zi)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ki)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Hi)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Xr||n===Yr||n===$r||n===qr)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(n===Xr)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Yr)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===$r)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===qr)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Zr||n===Kr||n===Jr)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(n===Zr||n===Kr)return s===Ye?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(n===Jr)return s===Ye?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===jr||n===Qr||n===es||n===ts||n===ns||n===is||n===rs||n===ss||n===as||n===os||n===ls||n===cs||n===ds||n===us)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(n===jr)return s===Ye?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Qr)return s===Ye?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===es)return s===Ye?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ts)return s===Ye?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ns)return s===Ye?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===is)return s===Ye?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===rs)return s===Ye?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ss)return s===Ye?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===as)return s===Ye?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===os)return s===Ye?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ls)return s===Ye?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===cs)return s===Ye?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ds)return s===Ye?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===us)return s===Ye?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Gi||n===hs||n===fs)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(n===Gi)return s===Ye?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===hs)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===fs)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===va||n===ps||n===ms||n===_s)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(n===Gi)return a.COMPRESSED_RED_RGTC1_EXT;if(n===ps)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ms)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===_s)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Vn?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class Bf extends Ht{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class _t extends Et{constructor(){super(),this.isGroup=!0,this.type="Group"}}const zf={type:"move"};class $s{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _t,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _t,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _t,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,a=null,s=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){s=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=d.position.distanceTo(u.position),h=.02,_=.005;c.inputState.pinching&&f>h+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,n),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&a!==null&&(r=a),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(zf)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new _t;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const kf=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Hf=`
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

}`;class Gf{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const r=new yt,a=e.properties.get(r);a.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new ht({vertexShader:kf,fragmentShader:Hf,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new st(new tt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Vf extends qn{constructor(e,t){super();const n=this;let r=null,a=1,s=null,o="local-floor",l=1,c=null,d=null,u=null,f=null,h=null,_=null;const v=new Gf,m=t.getContextAttributes();let p=null,b=null;const w=[],y=[],L=new Ue;let T=null;const A=new Ht;A.viewport=new it;const D=new Ht;D.viewport=new it;const S=[A,D],M=new Bf;let C=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let ee=w[X];return ee===void 0&&(ee=new $s,w[X]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(X){let ee=w[X];return ee===void 0&&(ee=new $s,w[X]=ee),ee.getGripSpace()},this.getHand=function(X){let ee=w[X];return ee===void 0&&(ee=new $s,w[X]=ee),ee.getHandSpace()};function z(X){const ee=y.indexOf(X.inputSource);if(ee===-1)return;const _e=w[ee];_e!==void 0&&(_e.update(X.inputSource,X.frame,c||s),_e.dispatchEvent({type:X.type,data:X.inputSource}))}function W(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",W),r.removeEventListener("inputsourceschange",K);for(let X=0;X<w.length;X++){const ee=y[X];ee!==null&&(y[X]=null,w[X].disconnect(ee))}C=null,Y=null,v.reset(),e.setRenderTarget(p),h=null,f=null,u=null,r=null,b=null,$e.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return u},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(X){if(r=X,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",W),r.addEventListener("inputsourceschange",K),m.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(L),r.renderState.layers===void 0){const ee={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:a};h=new XRWebGLLayer(r,t,ee),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),b=new mn(h.framebufferWidth,h.framebufferHeight,{format:It,type:$t,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let ee=null,_e=null,re=null;m.depth&&(re=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=m.stencil?Xn:Wn,_e=m.stencil?Vn:An);const Ee={colorFormat:t.RGBA8,depthFormat:re,scaleFactor:a};u=new XRWebGLBinding(r,t),f=u.createProjectionLayer(Ee),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),b=new mn(f.textureWidth,f.textureHeight,{format:It,type:$t,depthTexture:new uo(f.textureWidth,f.textureHeight,_e,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,s=await r.requestReferenceSpace(o),$e.setContext(r),$e.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function K(X){for(let ee=0;ee<X.removed.length;ee++){const _e=X.removed[ee],re=y.indexOf(_e);re>=0&&(y[re]=null,w[re].disconnect(_e))}for(let ee=0;ee<X.added.length;ee++){const _e=X.added[ee];let re=y.indexOf(_e);if(re===-1){for(let Te=0;Te<w.length;Te++)if(Te>=y.length){y.push(_e),re=Te;break}else if(y[Te]===null){y[Te]=_e,re=Te;break}if(re===-1)break}const Ee=w[re];Ee&&Ee.connect(_e)}}const G=new B,Q=new B;function H(X,ee,_e){G.setFromMatrixPosition(ee.matrixWorld),Q.setFromMatrixPosition(_e.matrixWorld);const re=G.distanceTo(Q),Ee=ee.projectionMatrix.elements,Te=_e.projectionMatrix.elements,Le=Ee[14]/(Ee[10]-1),et=Ee[14]/(Ee[10]+1),ze=(Ee[9]+1)/Ee[5],at=(Ee[9]-1)/Ee[5],U=(Ee[8]-1)/Ee[0],Lt=(Te[8]+1)/Te[0],Ne=Le*U,Fe=Le*Lt,Me=re/(-U+Lt),Je=Me*-U;if(ee.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Je),X.translateZ(Me),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Ee[10]===-1)X.projectionMatrix.copy(ee.projectionMatrix),X.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{const ye=Le+Me,E=et+Me,g=Ne-Je,N=Fe+(re-Je),$=ze*et/E*ye,Z=at*et/E*ye;X.projectionMatrix.makePerspective(g,N,$,Z,ye,E),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function ie(X,ee){ee===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(ee.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(r===null)return;let ee=X.near,_e=X.far;v.texture!==null&&(v.depthNear>0&&(ee=v.depthNear),v.depthFar>0&&(_e=v.depthFar)),M.near=D.near=A.near=ee,M.far=D.far=A.far=_e,(C!==M.near||Y!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),C=M.near,Y=M.far),A.layers.mask=X.layers.mask|2,D.layers.mask=X.layers.mask|4,M.layers.mask=A.layers.mask|D.layers.mask;const re=X.parent,Ee=M.cameras;ie(M,re);for(let Te=0;Te<Ee.length;Te++)ie(Ee[Te],re);Ee.length===2?H(M,A,D):M.projectionMatrix.copy(A.projectionMatrix),ce(X,M,re)};function ce(X,ee,_e){_e===null?X.matrix.copy(ee.matrixWorld):(X.matrix.copy(_e.matrixWorld),X.matrix.invert(),X.matrix.multiply(ee.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(ee.projectionMatrix),X.projectionMatrixInverse.copy(ee.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=yi*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(X){l=X,f!==null&&(f.fixedFoveation=X),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=X)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)};let xe=null;function De(X,ee){if(d=ee.getViewerPose(c||s),_=ee,d!==null){const _e=d.views;h!==null&&(e.setRenderTargetFramebuffer(b,h.framebuffer),e.setRenderTarget(b));let re=!1;_e.length!==M.cameras.length&&(M.cameras.length=0,re=!0);for(let Te=0;Te<_e.length;Te++){const Le=_e[Te];let et=null;if(h!==null)et=h.getViewport(Le);else{const at=u.getViewSubImage(f,Le);et=at.viewport,Te===0&&(e.setRenderTargetTextures(b,at.colorTexture,f.ignoreDepthValues?void 0:at.depthStencilTexture),e.setRenderTarget(b))}let ze=S[Te];ze===void 0&&(ze=new Ht,ze.layers.enable(Te),ze.viewport=new it,S[Te]=ze),ze.matrix.fromArray(Le.transform.matrix),ze.matrix.decompose(ze.position,ze.quaternion,ze.scale),ze.projectionMatrix.fromArray(Le.projectionMatrix),ze.projectionMatrixInverse.copy(ze.projectionMatrix).invert(),ze.viewport.set(et.x,et.y,et.width,et.height),Te===0&&(M.matrix.copy(ze.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),re===!0&&M.cameras.push(ze)}const Ee=r.enabledFeatures;if(Ee&&Ee.includes("depth-sensing")){const Te=u.getDepthInformation(_e[0]);Te&&Te.isValid&&Te.texture&&v.init(e,Te,r.renderState)}}for(let _e=0;_e<w.length;_e++){const re=y[_e],Ee=w[_e];re!==null&&Ee!==void 0&&Ee.update(re,ee,c||s)}xe&&xe(X,ee),ee.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ee}),_=null}const $e=new no;$e.setAnimationLoop(De),this.setAnimationLoop=function(X){xe=X},this.dispose=function(){}}}const On=new sn,Wf=new rt;function Xf(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Ka(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,b,w,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?a(m,p):p.isMeshToonMaterial?(a(m,p),u(m,p)):p.isMeshPhongMaterial?(a(m,p),d(m,p)):p.isMeshStandardMaterial?(a(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,y)):p.isMeshMatcapMaterial?(a(m,p),_(m,p)):p.isMeshDepthMaterial?a(m,p):p.isMeshDistanceMaterial?(a(m,p),v(m,p)):p.isMeshNormalMaterial?a(m,p):p.isLineBasicMaterial?(s(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,b,w):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function a(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===St&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===St&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=e.get(p),w=b.envMap,y=b.envMapRotation;w&&(m.envMap.value=w,On.copy(y),On.x*=-1,On.y*=-1,On.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(On.y*=-1,On.z*=-1),m.envMapRotation.value.setFromMatrix4(Wf.makeRotationFromEuler(On)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function s(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,b,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=w*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===St&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const b=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Yf(i,e,t,n){let r={},a={},s=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,w){const y=w.program;n.uniformBlockBinding(b,y)}function c(b,w){let y=r[b.id];y===void 0&&(_(b),y=d(b),r[b.id]=y,b.addEventListener("dispose",m));const L=w.program;n.updateUBOMapping(b,L);const T=e.render.frame;a[b.id]!==T&&(f(b),a[b.id]=T)}function d(b){const w=u();b.__bindingPointIndex=w;const y=i.createBuffer(),L=b.__size,T=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,L,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,y),y}function u(){for(let b=0;b<o;b++)if(s.indexOf(b)===-1)return s.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const w=r[b.id],y=b.uniforms,L=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let T=0,A=y.length;T<A;T++){const D=Array.isArray(y[T])?y[T]:[y[T]];for(let S=0,M=D.length;S<M;S++){const C=D[S];if(h(C,T,S,L)===!0){const Y=C.__offset,z=Array.isArray(C.value)?C.value:[C.value];let W=0;for(let K=0;K<z.length;K++){const G=z[K],Q=v(G);typeof G=="number"||typeof G=="boolean"?(C.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,Y+W,C.__data)):G.isMatrix3?(C.__data[0]=G.elements[0],C.__data[1]=G.elements[1],C.__data[2]=G.elements[2],C.__data[3]=0,C.__data[4]=G.elements[3],C.__data[5]=G.elements[4],C.__data[6]=G.elements[5],C.__data[7]=0,C.__data[8]=G.elements[6],C.__data[9]=G.elements[7],C.__data[10]=G.elements[8],C.__data[11]=0):(G.toArray(C.__data,W),W+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,Y,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(b,w,y,L){const T=b.value,A=w+"_"+y;if(L[A]===void 0)return typeof T=="number"||typeof T=="boolean"?L[A]=T:L[A]=T.clone(),!0;{const D=L[A];if(typeof T=="number"||typeof T=="boolean"){if(D!==T)return L[A]=T,!0}else if(D.equals(T)===!1)return D.copy(T),!0}return!1}function _(b){const w=b.uniforms;let y=0;const L=16;for(let A=0,D=w.length;A<D;A++){const S=Array.isArray(w[A])?w[A]:[w[A]];for(let M=0,C=S.length;M<C;M++){const Y=S[M],z=Array.isArray(Y.value)?Y.value:[Y.value];for(let W=0,K=z.length;W<K;W++){const G=z[W],Q=v(G),H=y%L,ie=H%Q.boundary,ce=H+ie;y+=ie,ce!==0&&L-ce<Q.storage&&(y+=L-ce),Y.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=y,y+=Q.storage}}}const T=y%L;return T>0&&(y+=L-T),b.__size=y,b.__cache={},this}function v(b){const w={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(w.boundary=4,w.storage=4):b.isVector2?(w.boundary=8,w.storage=8):b.isVector3||b.isColor?(w.boundary=16,w.storage=12):b.isVector4?(w.boundary=16,w.storage=16):b.isMatrix3?(w.boundary=48,w.storage=48):b.isMatrix4?(w.boundary=64,w.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),w}function m(b){const w=b.target;w.removeEventListener("dispose",m);const y=s.indexOf(w.__bindingPointIndex);s.splice(y,1),i.deleteBuffer(r[w.id]),delete r[w.id],delete a[w.id]}function p(){for(const b in r)i.deleteBuffer(r[b]);s=[],r={},a={}}return{bind:l,update:c,dispose:p}}class $f{constructor(e={}){const{canvas:t=pc(),context:n=null,depth:r=!0,stencil:a=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=s;const _=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const b=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Pt,this.toneMapping=fn,this.toneMappingExposure=1;const y=this;let L=!1,T=0,A=0,D=null,S=-1,M=null;const C=new it,Y=new it;let z=null;const W=new Ge(0);let K=0,G=t.width,Q=t.height,H=1,ie=null,ce=null;const xe=new it(0,0,G,Q),De=new it(0,0,G,Q);let $e=!1;const X=new to;let ee=!1,_e=!1;const re=new rt,Ee=new rt,Te=new B,Le=new it,et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ze=!1;function at(){return D===null?H:1}let U=n;function Lt(x,I){return t.getContext(x,I)}try{const x={alpha:!0,depth:r,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${wr}`),t.addEventListener("webglcontextlost",q,!1),t.addEventListener("webglcontextrestored",le,!1),t.addEventListener("webglcontextcreationerror",ae,!1),U===null){const I="webgl2";if(U=Lt(I,x),U===null)throw Lt(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let Ne,Fe,Me,Je,ye,E,g,N,$,Z,V,ge,se,de,ke,J,ue,Se,we,he,Oe,Pe,Ze,R;function ne(){Ne=new Ju(U),Ne.init(),Pe=new Of(U,Ne),Fe=new Xu(U,Ne,e,Pe),Me=new Lf(U,Ne),Fe.reverseDepthBuffer&&f&&Me.buffers.depth.setReversed(!0),Je=new eh(U),ye=new xf,E=new Ff(U,Ne,Me,ye,Fe,Pe,Je),g=new $u(y),N=new Ku(y),$=new Hc(U),Ze=new Vu(U,$),Z=new ju(U,$,Je,Ze),V=new nh(U,Z,$,Je),we=new th(U,Fe,E),J=new Yu(ye),ge=new vf(y,g,N,Ne,Fe,Ze,J),se=new Xf(y,ye),de=new Mf,ke=new Af(Ne),Se=new Gu(y,g,N,Me,V,h,l),ue=new Uf(y,V,Fe),R=new Yf(U,Je,Fe,Me),he=new Wu(U,Ne,Je),Oe=new Qu(U,Ne,Je),Je.programs=ge.programs,y.capabilities=Fe,y.extensions=Ne,y.properties=ye,y.renderLists=de,y.shadowMap=ue,y.state=Me,y.info=Je}ne();const k=new Vf(y,U);this.xr=k,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const x=Ne.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=Ne.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(x){x!==void 0&&(H=x,this.setSize(G,Q,!1))},this.getSize=function(x){return x.set(G,Q)},this.setSize=function(x,I,F=!0){if(k.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=x,Q=I,t.width=Math.floor(x*H),t.height=Math.floor(I*H),F===!0&&(t.style.width=x+"px",t.style.height=I+"px"),this.setViewport(0,0,x,I)},this.getDrawingBufferSize=function(x){return x.set(G*H,Q*H).floor()},this.setDrawingBufferSize=function(x,I,F){G=x,Q=I,H=F,t.width=Math.floor(x*F),t.height=Math.floor(I*F),this.setViewport(0,0,x,I)},this.getCurrentViewport=function(x){return x.copy(C)},this.getViewport=function(x){return x.copy(xe)},this.setViewport=function(x,I,F,O){x.isVector4?xe.set(x.x,x.y,x.z,x.w):xe.set(x,I,F,O),Me.viewport(C.copy(xe).multiplyScalar(H).round())},this.getScissor=function(x){return x.copy(De)},this.setScissor=function(x,I,F,O){x.isVector4?De.set(x.x,x.y,x.z,x.w):De.set(x,I,F,O),Me.scissor(Y.copy(De).multiplyScalar(H).round())},this.getScissorTest=function(){return $e},this.setScissorTest=function(x){Me.setScissorTest($e=x)},this.setOpaqueSort=function(x){ie=x},this.setTransparentSort=function(x){ce=x},this.getClearColor=function(x){return x.copy(Se.getClearColor())},this.setClearColor=function(){Se.setClearColor.apply(Se,arguments)},this.getClearAlpha=function(){return Se.getClearAlpha()},this.setClearAlpha=function(){Se.setClearAlpha.apply(Se,arguments)},this.clear=function(x=!0,I=!0,F=!0){let O=0;if(x){let P=!1;if(D!==null){const j=D.texture.format;P=j===Wr||j===Vr||j===Gr}if(P){const j=D.texture.type,oe=j===$t||j===An||j===gi||j===Vn||j===kr||j===Hr,fe=Se.getClearColor(),pe=Se.getClearAlpha(),be=fe.r,Re=fe.g,me=fe.b;oe?(_[0]=be,_[1]=Re,_[2]=me,_[3]=pe,U.clearBufferuiv(U.COLOR,0,_)):(v[0]=be,v[1]=Re,v[2]=me,v[3]=pe,U.clearBufferiv(U.COLOR,0,v))}else O|=U.COLOR_BUFFER_BIT}I&&(O|=U.DEPTH_BUFFER_BIT),F&&(O|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",q,!1),t.removeEventListener("webglcontextrestored",le,!1),t.removeEventListener("webglcontextcreationerror",ae,!1),de.dispose(),ke.dispose(),ye.dispose(),g.dispose(),N.dispose(),V.dispose(),Ze.dispose(),R.dispose(),ge.dispose(),k.dispose(),k.removeEventListener("sessionstart",nl),k.removeEventListener("sessionend",il),zn.stop()};function q(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function le(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const x=Je.autoReset,I=ue.enabled,F=ue.autoUpdate,O=ue.needsUpdate,P=ue.type;ne(),Je.autoReset=x,ue.enabled=I,ue.autoUpdate=F,ue.needsUpdate=O,ue.type=P}function ae(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function Ce(x){const I=x.target;I.removeEventListener("dispose",Ce),nt(I)}function nt(x){gt(x),ye.remove(x)}function gt(x){const I=ye.get(x).programs;I!==void 0&&(I.forEach(function(F){ge.releaseProgram(F)}),x.isShaderMaterial&&ge.releaseShaderCache(x))}this.renderBufferDirect=function(x,I,F,O,P,j){I===null&&(I=et);const oe=P.isMesh&&P.matrixWorld.determinant()<0,fe=Dp(x,I,F,O,P);Me.setMaterial(O,oe);let pe=F.index,be=1;if(O.wireframe===!0){if(pe=Z.getWireframeAttribute(F),pe===void 0)return;be=2}const Re=F.drawRange,me=F.attributes.position;let He=Re.start*be,Ke=(Re.start+Re.count)*be;j!==null&&(He=Math.max(He,j.start*be),Ke=Math.min(Ke,(j.start+j.count)*be)),pe!==null?(He=Math.max(He,0),Ke=Math.min(Ke,pe.count)):me!=null&&(He=Math.max(He,0),Ke=Math.min(Ke,me.count));const je=Ke-He;if(je<0||je===1/0)return;Ze.setup(P,O,fe,F,pe);let bt,Ve=he;if(pe!==null&&(bt=$.get(pe),Ve=Oe,Ve.setIndex(bt)),P.isMesh)O.wireframe===!0?(Me.setLineWidth(O.wireframeLinewidth*at()),Ve.setMode(U.LINES)):Ve.setMode(U.TRIANGLES);else if(P.isLine){let ve=O.linewidth;ve===void 0&&(ve=1),Me.setLineWidth(ve*at()),P.isLineSegments?Ve.setMode(U.LINES):P.isLineLoop?Ve.setMode(U.LINE_LOOP):Ve.setMode(U.LINE_STRIP)}else P.isPoints?Ve.setMode(U.POINTS):P.isSprite&&Ve.setMode(U.TRIANGLES);if(P.isBatchedMesh)if(P._multiDrawInstances!==null)Ve.renderMultiDrawInstances(P._multiDrawStarts,P._multiDrawCounts,P._multiDrawCount,P._multiDrawInstances);else if(Ne.get("WEBGL_multi_draw"))Ve.renderMultiDraw(P._multiDrawStarts,P._multiDrawCounts,P._multiDrawCount);else{const ve=P._multiDrawStarts,dn=P._multiDrawCounts,We=P._multiDrawCount,Wt=pe?$.get(pe).bytesPerElement:1,_i=ye.get(O).currentProgram.getUniforms();for(let Ct=0;Ct<We;Ct++)_i.setValue(U,"_gl_DrawID",Ct),Ve.render(ve[Ct]/Wt,dn[Ct])}else if(P.isInstancedMesh)Ve.renderInstances(He,je,P.count);else if(F.isInstancedBufferGeometry){const ve=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,dn=Math.min(F.instanceCount,ve);Ve.renderInstances(He,je,dn)}else Ve.render(He,je)};function Xe(x,I,F){x.transparent===!0&&x.side===jt&&x.forceSinglePass===!1?(x.side=St,x.needsUpdate=!0,Er(x,I,F),x.side=un,x.needsUpdate=!0,Er(x,I,F),x.side=jt):Er(x,I,F)}this.compile=function(x,I,F=null){F===null&&(F=x),p=ke.get(F),p.init(I),w.push(p),F.traverseVisible(function(P){P.isLight&&P.layers.test(I.layers)&&(p.pushLight(P),P.castShadow&&p.pushShadow(P))}),x!==F&&x.traverseVisible(function(P){P.isLight&&P.layers.test(I.layers)&&(p.pushLight(P),P.castShadow&&p.pushShadow(P))}),p.setupLights();const O=new Set;return x.traverse(function(P){if(!(P.isMesh||P.isPoints||P.isLine||P.isSprite))return;const j=P.material;if(j)if(Array.isArray(j))for(let oe=0;oe<j.length;oe++){const fe=j[oe];Xe(fe,F,P),O.add(fe)}else Xe(j,F,P),O.add(j)}),w.pop(),p=null,O},this.compileAsync=function(x,I,F=null){const O=this.compile(x,I,F);return new Promise(P=>{function j(){if(O.forEach(function(oe){ye.get(oe).currentProgram.isReady()&&O.delete(oe)}),O.size===0){P(x);return}setTimeout(j,10)}Ne.get("KHR_parallel_shader_compile")!==null?j():setTimeout(j,10)})};let Vt=null;function cn(x){Vt&&Vt(x)}function nl(){zn.stop()}function il(){zn.start()}const zn=new no;zn.setAnimationLoop(cn),typeof self<"u"&&zn.setContext(self),this.setAnimationLoop=function(x){Vt=x,k.setAnimationLoop(x),x===null?zn.stop():zn.start()},k.addEventListener("sessionstart",nl),k.addEventListener("sessionend",il),this.render=function(x,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),k.enabled===!0&&k.isPresenting===!0&&(k.cameraAutoUpdate===!0&&k.updateCamera(I),I=k.getCamera()),x.isScene===!0&&x.onBeforeRender(y,x,I,D),p=ke.get(x,w.length),p.init(I),w.push(p),Ee.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),X.setFromProjectionMatrix(Ee),_e=this.localClippingEnabled,ee=J.init(this.clippingPlanes,_e),m=de.get(x,b.length),m.init(),b.push(m),k.enabled===!0&&k.isPresenting===!0){const j=y.xr.getDepthSensingMesh();j!==null&&ta(j,I,-1/0,y.sortObjects)}ta(x,I,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(ie,ce),ze=k.enabled===!1||k.isPresenting===!1||k.hasDepthSensing()===!1,ze&&Se.addToRenderList(m,x),this.info.render.frame++,ee===!0&&J.beginShadows();const F=p.state.shadowsArray;ue.render(F,x,I),ee===!0&&J.endShadows(),this.info.autoReset===!0&&this.info.reset();const O=m.opaque,P=m.transmissive;if(p.setupLights(),I.isArrayCamera){const j=I.cameras;if(P.length>0)for(let oe=0,fe=j.length;oe<fe;oe++){const pe=j[oe];sl(O,P,x,pe)}ze&&Se.render(x);for(let oe=0,fe=j.length;oe<fe;oe++){const pe=j[oe];rl(m,x,pe,pe.viewport)}}else P.length>0&&sl(O,P,x,I),ze&&Se.render(x),rl(m,x,I);D!==null&&(E.updateMultisampleRenderTarget(D),E.updateRenderTargetMipmap(D)),x.isScene===!0&&x.onAfterRender(y,x,I),Ze.resetDefaultState(),S=-1,M=null,w.pop(),w.length>0?(p=w[w.length-1],ee===!0&&J.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function ta(x,I,F,O){if(x.visible===!1)return;if(x.layers.test(I.layers)){if(x.isGroup)F=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(I);else if(x.isLight)p.pushLight(x),x.castShadow&&p.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||X.intersectsSprite(x)){O&&Le.setFromMatrixPosition(x.matrixWorld).applyMatrix4(Ee);const oe=V.update(x),fe=x.material;fe.visible&&m.push(x,oe,fe,F,Le.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||X.intersectsObject(x))){const oe=V.update(x),fe=x.material;if(O&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Le.copy(x.boundingSphere.center)):(oe.boundingSphere===null&&oe.computeBoundingSphere(),Le.copy(oe.boundingSphere.center)),Le.applyMatrix4(x.matrixWorld).applyMatrix4(Ee)),Array.isArray(fe)){const pe=oe.groups;for(let be=0,Re=pe.length;be<Re;be++){const me=pe[be],He=fe[me.materialIndex];He&&He.visible&&m.push(x,oe,He,F,Le.z,me)}}else fe.visible&&m.push(x,oe,fe,F,Le.z,null)}}const j=x.children;for(let oe=0,fe=j.length;oe<fe;oe++)ta(j[oe],I,F,O)}function rl(x,I,F,O){const P=x.opaque,j=x.transmissive,oe=x.transparent;p.setupLightsView(F),ee===!0&&J.setGlobalState(y.clippingPlanes,F),O&&Me.viewport(C.copy(O)),P.length>0&&Sr(P,I,F),j.length>0&&Sr(j,I,F),oe.length>0&&Sr(oe,I,F),Me.buffers.depth.setTest(!0),Me.buffers.depth.setMask(!0),Me.buffers.color.setMask(!0),Me.setPolygonOffset(!1)}function sl(x,I,F,O){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[O.id]===void 0&&(p.state.transmissionRenderTarget[O.id]=new mn(1,1,{generateMipmaps:!0,type:Ne.has("EXT_color_buffer_half_float")||Ne.has("EXT_color_buffer_float")?vi:$t,minFilter:Tn,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Be.workingColorSpace}));const j=p.state.transmissionRenderTarget[O.id],oe=O.viewport||C;j.setSize(oe.z,oe.w);const fe=y.getRenderTarget();y.setRenderTarget(j),y.getClearColor(W),K=y.getClearAlpha(),K<1&&y.setClearColor(16777215,.5),y.clear(),ze&&Se.render(F);const pe=y.toneMapping;y.toneMapping=fn;const be=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),p.setupLightsView(O),ee===!0&&J.setGlobalState(y.clippingPlanes,O),Sr(x,F,O),E.updateMultisampleRenderTarget(j),E.updateRenderTargetMipmap(j),Ne.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let me=0,He=I.length;me<He;me++){const Ke=I[me],je=Ke.object,bt=Ke.geometry,Ve=Ke.material,ve=Ke.group;if(Ve.side===jt&&je.layers.test(O.layers)){const dn=Ve.side;Ve.side=St,Ve.needsUpdate=!0,al(je,F,O,bt,Ve,ve),Ve.side=dn,Ve.needsUpdate=!0,Re=!0}}Re===!0&&(E.updateMultisampleRenderTarget(j),E.updateRenderTargetMipmap(j))}y.setRenderTarget(fe),y.setClearColor(W,K),be!==void 0&&(O.viewport=be),y.toneMapping=pe}function Sr(x,I,F){const O=I.isScene===!0?I.overrideMaterial:null;for(let P=0,j=x.length;P<j;P++){const oe=x[P],fe=oe.object,pe=oe.geometry,be=O===null?oe.material:O,Re=oe.group;fe.layers.test(F.layers)&&al(fe,I,F,pe,be,Re)}}function al(x,I,F,O,P,j){x.onBeforeRender(y,I,F,O,P,j),x.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),P.onBeforeRender(y,I,F,O,x,j),P.transparent===!0&&P.side===jt&&P.forceSinglePass===!1?(P.side=St,P.needsUpdate=!0,y.renderBufferDirect(F,I,O,P,x,j),P.side=un,P.needsUpdate=!0,y.renderBufferDirect(F,I,O,P,x,j),P.side=jt):y.renderBufferDirect(F,I,O,P,x,j),x.onAfterRender(y,I,F,O,P,j)}function Er(x,I,F){I.isScene!==!0&&(I=et);const O=ye.get(x),P=p.state.lights,j=p.state.shadowsArray,oe=P.state.version,fe=ge.getParameters(x,P.state,j,I,F),pe=ge.getProgramCacheKey(fe);let be=O.programs;O.environment=x.isMeshStandardMaterial?I.environment:null,O.fog=I.fog,O.envMap=(x.isMeshStandardMaterial?N:g).get(x.envMap||O.environment),O.envMapRotation=O.environment!==null&&x.envMap===null?I.environmentRotation:x.envMapRotation,be===void 0&&(x.addEventListener("dispose",Ce),be=new Map,O.programs=be);let Re=be.get(pe);if(Re!==void 0){if(O.currentProgram===Re&&O.lightsStateVersion===oe)return ll(x,fe),Re}else fe.uniforms=ge.getUniforms(x),x.onBeforeCompile(fe,y),Re=ge.acquireProgram(fe,pe),be.set(pe,Re),O.uniforms=fe.uniforms;const me=O.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(me.clippingPlanes=J.uniform),ll(x,fe),O.needsLights=Np(x),O.lightsStateVersion=oe,O.needsLights&&(me.ambientLightColor.value=P.state.ambient,me.lightProbe.value=P.state.probe,me.directionalLights.value=P.state.directional,me.directionalLightShadows.value=P.state.directionalShadow,me.spotLights.value=P.state.spot,me.spotLightShadows.value=P.state.spotShadow,me.rectAreaLights.value=P.state.rectArea,me.ltc_1.value=P.state.rectAreaLTC1,me.ltc_2.value=P.state.rectAreaLTC2,me.pointLights.value=P.state.point,me.pointLightShadows.value=P.state.pointShadow,me.hemisphereLights.value=P.state.hemi,me.directionalShadowMap.value=P.state.directionalShadowMap,me.directionalShadowMatrix.value=P.state.directionalShadowMatrix,me.spotShadowMap.value=P.state.spotShadowMap,me.spotLightMatrix.value=P.state.spotLightMatrix,me.spotLightMap.value=P.state.spotLightMap,me.pointShadowMap.value=P.state.pointShadowMap,me.pointShadowMatrix.value=P.state.pointShadowMatrix),O.currentProgram=Re,O.uniformsList=null,Re}function ol(x){if(x.uniformsList===null){const I=x.currentProgram.getUniforms();x.uniformsList=fr.seqWithValue(I.seq,x.uniforms)}return x.uniformsList}function ll(x,I){const F=ye.get(x);F.outputColorSpace=I.outputColorSpace,F.batching=I.batching,F.batchingColor=I.batchingColor,F.instancing=I.instancing,F.instancingColor=I.instancingColor,F.instancingMorph=I.instancingMorph,F.skinning=I.skinning,F.morphTargets=I.morphTargets,F.morphNormals=I.morphNormals,F.morphColors=I.morphColors,F.morphTargetsCount=I.morphTargetsCount,F.numClippingPlanes=I.numClippingPlanes,F.numIntersection=I.numClipIntersection,F.vertexAlphas=I.vertexAlphas,F.vertexTangents=I.vertexTangents,F.toneMapping=I.toneMapping}function Dp(x,I,F,O,P){I.isScene!==!0&&(I=et),E.resetTextureUnits();const j=I.fog,oe=O.isMeshStandardMaterial?I.environment:null,fe=D===null?y.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:Yn,pe=(O.isMeshStandardMaterial?N:g).get(O.envMap||oe),be=O.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Re=!!F.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),me=!!F.morphAttributes.position,He=!!F.morphAttributes.normal,Ke=!!F.morphAttributes.color;let je=fn;O.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(je=y.toneMapping);const bt=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,Ve=bt!==void 0?bt.length:0,ve=ye.get(O),dn=p.state.lights;if(ee===!0&&(_e===!0||x!==M)){const Nt=x===M&&O.id===S;J.setState(O,x,Nt)}let We=!1;O.version===ve.__version?(ve.needsLights&&ve.lightsStateVersion!==dn.state.version||ve.outputColorSpace!==fe||P.isBatchedMesh&&ve.batching===!1||!P.isBatchedMesh&&ve.batching===!0||P.isBatchedMesh&&ve.batchingColor===!0&&P.colorTexture===null||P.isBatchedMesh&&ve.batchingColor===!1&&P.colorTexture!==null||P.isInstancedMesh&&ve.instancing===!1||!P.isInstancedMesh&&ve.instancing===!0||P.isSkinnedMesh&&ve.skinning===!1||!P.isSkinnedMesh&&ve.skinning===!0||P.isInstancedMesh&&ve.instancingColor===!0&&P.instanceColor===null||P.isInstancedMesh&&ve.instancingColor===!1&&P.instanceColor!==null||P.isInstancedMesh&&ve.instancingMorph===!0&&P.morphTexture===null||P.isInstancedMesh&&ve.instancingMorph===!1&&P.morphTexture!==null||ve.envMap!==pe||O.fog===!0&&ve.fog!==j||ve.numClippingPlanes!==void 0&&(ve.numClippingPlanes!==J.numPlanes||ve.numIntersection!==J.numIntersection)||ve.vertexAlphas!==be||ve.vertexTangents!==Re||ve.morphTargets!==me||ve.morphNormals!==He||ve.morphColors!==Ke||ve.toneMapping!==je||ve.morphTargetsCount!==Ve)&&(We=!0):(We=!0,ve.__version=O.version);let Wt=ve.currentProgram;We===!0&&(Wt=Er(O,I,P));let _i=!1,Ct=!1,Li=!1;const Qe=Wt.getUniforms(),Kt=ve.uniforms;if(Me.useProgram(Wt.program)&&(_i=!0,Ct=!0,Li=!0),O.id!==S&&(S=O.id,Ct=!0),_i||M!==x){Me.buffers.depth.getReversed()?(re.copy(x.projectionMatrix),_c(re),gc(re),Qe.setValue(U,"projectionMatrix",re)):Qe.setValue(U,"projectionMatrix",x.projectionMatrix),Qe.setValue(U,"viewMatrix",x.matrixWorldInverse);const Sn=Qe.map.cameraPosition;Sn!==void 0&&Sn.setValue(U,Te.setFromMatrixPosition(x.matrixWorld)),Fe.logarithmicDepthBuffer&&Qe.setValue(U,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&Qe.setValue(U,"isOrthographic",x.isOrthographicCamera===!0),M!==x&&(M=x,Ct=!0,Li=!0)}if(P.isSkinnedMesh){Qe.setOptional(U,P,"bindMatrix"),Qe.setOptional(U,P,"bindMatrixInverse");const Nt=P.skeleton;Nt&&(Nt.boneTexture===null&&Nt.computeBoneTexture(),Qe.setValue(U,"boneTexture",Nt.boneTexture,E))}P.isBatchedMesh&&(Qe.setOptional(U,P,"batchingTexture"),Qe.setValue(U,"batchingTexture",P._matricesTexture,E),Qe.setOptional(U,P,"batchingIdTexture"),Qe.setValue(U,"batchingIdTexture",P._indirectTexture,E),Qe.setOptional(U,P,"batchingColorTexture"),P._colorsTexture!==null&&Qe.setValue(U,"batchingColorTexture",P._colorsTexture,E));const Ni=F.morphAttributes;if((Ni.position!==void 0||Ni.normal!==void 0||Ni.color!==void 0)&&we.update(P,F,Wt),(Ct||ve.receiveShadow!==P.receiveShadow)&&(ve.receiveShadow=P.receiveShadow,Qe.setValue(U,"receiveShadow",P.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&(Kt.envMap.value=pe,Kt.flipEnvMap.value=pe.isCubeTexture&&pe.isRenderTargetTexture===!1?-1:1),O.isMeshStandardMaterial&&O.envMap===null&&I.environment!==null&&(Kt.envMapIntensity.value=I.environmentIntensity),Ct&&(Qe.setValue(U,"toneMappingExposure",y.toneMappingExposure),ve.needsLights&&Lp(Kt,Li),j&&O.fog===!0&&se.refreshFogUniforms(Kt,j),se.refreshMaterialUniforms(Kt,O,H,Q,p.state.transmissionRenderTarget[x.id]),fr.upload(U,ol(ve),Kt,E)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(fr.upload(U,ol(ve),Kt,E),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&Qe.setValue(U,"center",P.center),Qe.setValue(U,"modelViewMatrix",P.modelViewMatrix),Qe.setValue(U,"normalMatrix",P.normalMatrix),Qe.setValue(U,"modelMatrix",P.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const Nt=O.uniformsGroups;for(let Sn=0,En=Nt.length;Sn<En;Sn++){const cl=Nt[Sn];R.update(cl,Wt),R.bind(cl,Wt)}}return Wt}function Lp(x,I){x.ambientLightColor.needsUpdate=I,x.lightProbe.needsUpdate=I,x.directionalLights.needsUpdate=I,x.directionalLightShadows.needsUpdate=I,x.pointLights.needsUpdate=I,x.pointLightShadows.needsUpdate=I,x.spotLights.needsUpdate=I,x.spotLightShadows.needsUpdate=I,x.rectAreaLights.needsUpdate=I,x.hemisphereLights.needsUpdate=I}function Np(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(x,I,F){ye.get(x.texture).__webglTexture=I,ye.get(x.depthTexture).__webglTexture=F;const O=ye.get(x);O.__hasExternalTextures=!0,O.__autoAllocateDepthBuffer=F===void 0,O.__autoAllocateDepthBuffer||Ne.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),O.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(x,I){const F=ye.get(x);F.__webglFramebuffer=I,F.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(x,I=0,F=0){D=x,T=I,A=F;let O=!0,P=null,j=!1,oe=!1;if(x){const pe=ye.get(x);if(pe.__useDefaultFramebuffer!==void 0)Me.bindFramebuffer(U.FRAMEBUFFER,null),O=!1;else if(pe.__webglFramebuffer===void 0)E.setupRenderTarget(x);else if(pe.__hasExternalTextures)E.rebindTextures(x,ye.get(x.texture).__webglTexture,ye.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const me=x.depthTexture;if(pe.__boundDepthTexture!==me){if(me!==null&&ye.has(me)&&(x.width!==me.image.width||x.height!==me.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(x)}}const be=x.texture;(be.isData3DTexture||be.isDataArrayTexture||be.isCompressedArrayTexture)&&(oe=!0);const Re=ye.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Re[I])?P=Re[I][F]:P=Re[I],j=!0):x.samples>0&&E.useMultisampledRTT(x)===!1?P=ye.get(x).__webglMultisampledFramebuffer:Array.isArray(Re)?P=Re[F]:P=Re,C.copy(x.viewport),Y.copy(x.scissor),z=x.scissorTest}else C.copy(xe).multiplyScalar(H).floor(),Y.copy(De).multiplyScalar(H).floor(),z=$e;if(Me.bindFramebuffer(U.FRAMEBUFFER,P)&&O&&Me.drawBuffers(x,P),Me.viewport(C),Me.scissor(Y),Me.setScissorTest(z),j){const pe=ye.get(x.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+I,pe.__webglTexture,F)}else if(oe){const pe=ye.get(x.texture),be=I||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,pe.__webglTexture,F||0,be)}S=-1},this.readRenderTargetPixels=function(x,I,F,O,P,j,oe){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let fe=ye.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&oe!==void 0&&(fe=fe[oe]),fe){Me.bindFramebuffer(U.FRAMEBUFFER,fe);try{const pe=x.texture,be=pe.format,Re=pe.type;if(!Fe.textureFormatReadable(be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Fe.textureTypeReadable(Re)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=x.width-O&&F>=0&&F<=x.height-P&&U.readPixels(I,F,O,P,Pe.convert(be),Pe.convert(Re),j)}finally{const pe=D!==null?ye.get(D).__webglFramebuffer:null;Me.bindFramebuffer(U.FRAMEBUFFER,pe)}}},this.readRenderTargetPixelsAsync=async function(x,I,F,O,P,j,oe){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let fe=ye.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&oe!==void 0&&(fe=fe[oe]),fe){const pe=x.texture,be=pe.format,Re=pe.type;if(!Fe.textureFormatReadable(be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Fe.textureTypeReadable(Re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(I>=0&&I<=x.width-O&&F>=0&&F<=x.height-P){Me.bindFramebuffer(U.FRAMEBUFFER,fe);const me=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,me),U.bufferData(U.PIXEL_PACK_BUFFER,j.byteLength,U.STREAM_READ),U.readPixels(I,F,O,P,Pe.convert(be),Pe.convert(Re),0);const He=D!==null?ye.get(D).__webglFramebuffer:null;Me.bindFramebuffer(U.FRAMEBUFFER,He);const Ke=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await mc(U,Ke,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,me),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,j),U.deleteBuffer(me),U.deleteSync(Ke),j}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(x,I=null,F=0){x.isTexture!==!0&&(Si("WebGLRenderer: copyFramebufferToTexture function signature has changed."),I=arguments[0]||null,x=arguments[1]);const O=Math.pow(2,-F),P=Math.floor(x.image.width*O),j=Math.floor(x.image.height*O),oe=I!==null?I.x:0,fe=I!==null?I.y:0;E.setTexture2D(x,0),U.copyTexSubImage2D(U.TEXTURE_2D,F,0,0,oe,fe,P,j),Me.unbindTexture()},this.copyTextureToTexture=function(x,I,F=null,O=null,P=0){x.isTexture!==!0&&(Si("WebGLRenderer: copyTextureToTexture function signature has changed."),O=arguments[0]||null,x=arguments[1],I=arguments[2],P=arguments[3]||0,F=null);let j,oe,fe,pe,be,Re,me,He,Ke;const je=x.isCompressedTexture?x.mipmaps[P]:x.image;F!==null?(j=F.max.x-F.min.x,oe=F.max.y-F.min.y,fe=F.isBox3?F.max.z-F.min.z:1,pe=F.min.x,be=F.min.y,Re=F.isBox3?F.min.z:0):(j=je.width,oe=je.height,fe=je.depth||1,pe=0,be=0,Re=0),O!==null?(me=O.x,He=O.y,Ke=O.z):(me=0,He=0,Ke=0);const bt=Pe.convert(I.format),Ve=Pe.convert(I.type);let ve;I.isData3DTexture?(E.setTexture3D(I,0),ve=U.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(E.setTexture2DArray(I,0),ve=U.TEXTURE_2D_ARRAY):(E.setTexture2D(I,0),ve=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,I.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,I.unpackAlignment);const dn=U.getParameter(U.UNPACK_ROW_LENGTH),We=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Wt=U.getParameter(U.UNPACK_SKIP_PIXELS),_i=U.getParameter(U.UNPACK_SKIP_ROWS),Ct=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,je.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,je.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,pe),U.pixelStorei(U.UNPACK_SKIP_ROWS,be),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Re);const Li=x.isDataArrayTexture||x.isData3DTexture,Qe=I.isDataArrayTexture||I.isData3DTexture;if(x.isRenderTargetTexture||x.isDepthTexture){const Kt=ye.get(x),Ni=ye.get(I),Nt=ye.get(Kt.__renderTarget),Sn=ye.get(Ni.__renderTarget);Me.bindFramebuffer(U.READ_FRAMEBUFFER,Nt.__webglFramebuffer),Me.bindFramebuffer(U.DRAW_FRAMEBUFFER,Sn.__webglFramebuffer);for(let En=0;En<fe;En++)Li&&U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ye.get(x).__webglTexture,P,Re+En),x.isDepthTexture?(Qe&&U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ye.get(I).__webglTexture,P,Ke+En),U.blitFramebuffer(pe,be,j,oe,me,He,j,oe,U.DEPTH_BUFFER_BIT,U.NEAREST)):Qe?U.copyTexSubImage3D(ve,P,me,He,Ke+En,pe,be,j,oe):U.copyTexSubImage2D(ve,P,me,He,Ke+En,pe,be,j,oe);Me.bindFramebuffer(U.READ_FRAMEBUFFER,null),Me.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else Qe?x.isDataTexture||x.isData3DTexture?U.texSubImage3D(ve,P,me,He,Ke,j,oe,fe,bt,Ve,je.data):I.isCompressedArrayTexture?U.compressedTexSubImage3D(ve,P,me,He,Ke,j,oe,fe,bt,je.data):U.texSubImage3D(ve,P,me,He,Ke,j,oe,fe,bt,Ve,je):x.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,P,me,He,j,oe,bt,Ve,je.data):x.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,P,me,He,je.width,je.height,bt,je.data):U.texSubImage2D(U.TEXTURE_2D,P,me,He,j,oe,bt,Ve,je);U.pixelStorei(U.UNPACK_ROW_LENGTH,dn),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,We),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Wt),U.pixelStorei(U.UNPACK_SKIP_ROWS,_i),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ct),P===0&&I.generateMipmaps&&U.generateMipmap(ve),Me.unbindTexture()},this.copyTextureToTexture3D=function(x,I,F=null,O=null,P=0){return x.isTexture!==!0&&(Si("WebGLRenderer: copyTextureToTexture3D function signature has changed."),F=arguments[0]||null,O=arguments[1]||null,x=arguments[2],I=arguments[3],P=arguments[4]||0),Si('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(x,I,F,O,P)},this.initRenderTarget=function(x){ye.get(x).__webglFramebuffer===void 0&&E.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?E.setTextureCube(x,0):x.isData3DTexture?E.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?E.setTexture2DArray(x,0):E.setTexture2D(x,0),Me.unbindTexture()},this.resetState=function(){T=0,A=0,D=null,Me.reset(),Ze.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return en}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Be._getDrawingBufferColorSpace(e),t.unpackColorSpace=Be._getUnpackColorSpace()}}class Lo extends Et{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new sn,this.environmentIntensity=1,this.environmentRotation=new sn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Zt extends wt{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}class mr extends Ci{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Ge(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const No=new rt,qs=new La,_r=new Zi,gr=new B;class Zs extends Et{constructor(e=new Dt,t=new mr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,a=e.params.Points.threshold,s=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),_r.copy(n.boundingSphere),_r.applyMatrix4(r),_r.radius+=a,e.ray.intersectsSphere(_r)===!1)return;No.copy(r).invert(),qs.copy(e.ray).applyMatrix4(No);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const f=Math.max(0,s.start),h=Math.min(c.count,s.start+s.count);for(let _=f,v=h;_<v;_++){const m=c.getX(_);gr.fromBufferAttribute(u,m),Fo(gr,m,l,r,e,t,this)}}else{const f=Math.max(0,s.start),h=Math.min(u.count,s.start+s.count);for(let _=f,v=h;_<v;_++)gr.fromBufferAttribute(u,_),Fo(gr,_,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,s=r.length;a<s;a++){const o=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function Fo(i,e,t,n,r,a,s){const o=qs.distanceSqToPoint(i);if(o<t){const l=new B;qs.closestPointToPoint(i,l),l.applyMatrix4(n);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;a.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:s})}}class qf extends yt{constructor(e,t,n,r,a,s,o,l,c){super(e,t,n,r,a,s,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Oo extends Dt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:wr}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=wr);const Ks=100,vr=new Map;let Zf=0;const Bo=typeof globalThis.requestAnimationFrame=="function"?i=>globalThis.requestAnimationFrame(i):i=>{const e=++Zf,t=setTimeout(()=>{vr.delete(e),i(performance.now())},16);return vr.set(e,t),e},Kf=typeof globalThis.cancelAnimationFrame=="function"?i=>globalThis.cancelAnimationFrame(i):i=>{const e=vr.get(i);e&&(clearTimeout(e),vr.delete(i))};function xr(i,e=i){if(typeof document<"u"&&document.createElement){const t=document.createElement("canvas");t.width=i,t.height=e;const n=t.getContext("2d");if(!n)throw new Error("Unable to get 2D context");return{canvas:t,ctx:n}}if(typeof OffscreenCanvas<"u"){const t=new OffscreenCanvas(i,e),n=t.getContext("2d");if(!n)throw new Error("Unable to get 2D context");return{canvas:t,ctx:n}}throw new Error("Canvas not supported")}function yr(i){return new qf(i)}function zo(){const{canvas:e,ctx:t}=xr(32,32),n=t.createRadialGradient(32/2,32/2,0,32/2,32/2,32/2);n.addColorStop(0,"rgba(255, 255, 255, 1)"),n.addColorStop(.4,"rgba(255, 255, 255, 0.5)"),n.addColorStop(1,"rgba(255, 255, 255, 0)"),t.fillStyle=n,t.fillRect(0,0,32,32);const r=yr(e);return r.needsUpdate=!0,r}function Jf(){const{canvas:e,ctx:t}=xr(16,16),n=t.createRadialGradient(16/2,16/2,0,16/2,16/2,16/2);n.addColorStop(0,"rgba(255, 255, 255, 1)"),n.addColorStop(.3,"rgba(255, 255, 255, 0.6)"),n.addColorStop(1,"rgba(255, 255, 255, 0)"),t.fillStyle=n,t.fillRect(0,0,16,16);const r=yr(e);return r.needsUpdate=!0,r}const Js=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;class jf{constructor(e){this.canvas=e.canvas,this.viewportWidth=e.viewportWidth,this.viewportHeight=e.viewportHeight,this.devicePixelRatio=e.devicePixelRatio??1,this.isMobile=e.isMobile??!1,this.viewWidth=this.computeViewWidth(Ks),this.viewHeight=Ks,this.camera=this.createCamera(),this.renderer=this.createRenderer(),this.scene=new Lo,this.animationFrame=null,this.lastTimestamp=0,this.currentEffect="none",this.activeEffect=null,this.opacity=100,this.effectExtras={},this.lastAppliedExtras={},this.snowSurfaces=[],this.smogOverlay=null,this.windowDropletsOverlay=null,this.renderTarget=null,this.maskScene=null,this.maskCamera=null,this.maskQuad=null,this.renderLoop=t=>this.renderFrame(t)}computeViewWidth(e){return e*(this.viewportWidth/Math.max(1,this.viewportHeight))}createCamera(){const e=this.viewWidth/2,t=this.viewHeight/2,n=new Bs(-e,e,t,-t,-1e3,1e3);return n.position.z=10,n}createRenderer(){const e=new $f({canvas:this.canvas,alpha:!0,antialias:!this.isMobile,powerPreference:"high-performance",stencil:!1,depth:!1,preserveDrawingBuffer:!1});return e.setPixelRatio(Math.min(this.devicePixelRatio||1,this.isMobile?1:1.5)),e.setSize(this.viewportWidth,this.viewportHeight,!1),e}start(e,t,n={}){this.opacity=Math.max(0,Math.min(100,t)),this.effectExtras=n;const r=this.effectExtras.moonPosition,a=this.lastAppliedExtras.moonPosition,s=r?.x!==a?.x||r?.y!==a?.y,o=this.lastAppliedExtras.snowAccumulation!==this.effectExtras.snowAccumulation||this.lastAppliedExtras.matrixRainColor!==this.effectExtras.matrixRainColor||this.lastAppliedExtras.smogActive!==this.effectExtras.smogActive||this.lastAppliedExtras.windowDroplets!==this.effectExtras.windowDroplets||s;if(this.currentEffect===e&&this.activeEffect&&!o){this.activeEffect.setOpacity(this.opacity),this.updateSmogOverlay(),this.updateWindowDropletsOverlay(),this.startLoop();return}this.setEffect(e)}stop(){this.disposeSmogOverlay(),this.disposeWindowDropletsOverlay(),this.disposeActiveEffect(),this.currentEffect="none",this.stopLoop(),this.lastAppliedExtras={}}updateSmogOverlay(){const e=!!this.effectExtras.smogActive;e&&!this.smogOverlay?(this.smogOverlay=hp(this),this.scene.add(this.smogOverlay.group)):!e&&this.smogOverlay?this.disposeSmogOverlay():this.smogOverlay&&this.smogOverlay.setOpacity(this.opacity)}disposeSmogOverlay(){this.smogOverlay&&(this.scene.remove(this.smogOverlay.group),this.smogOverlay.dispose(),this.smogOverlay=null)}updateWindowDropletsOverlay(){const e=!!this.effectExtras.windowDroplets;e&&!this.windowDropletsOverlay?(this.windowDropletsOverlay=up(this),this.scene.add(this.windowDropletsOverlay.group)):!e&&this.windowDropletsOverlay?this.disposeWindowDropletsOverlay():this.windowDropletsOverlay&&this.windowDropletsOverlay.setOpacity(this.opacity)}disposeWindowDropletsOverlay(){this.windowDropletsOverlay&&(this.scene.remove(this.windowDropletsOverlay.group),this.windowDropletsOverlay.dispose(),this.windowDropletsOverlay=null)}setOpacity(e){this.opacity=Math.max(0,Math.min(100,e)),this.activeEffect?.setOpacity(this.opacity)}setSnowSurfaces(e){this.snowSurfaces=e||[],this.activeEffect?.setSnowSurfaces?.(this.snowSurfaces)}getLastAppliedExtras(){return{...this.lastAppliedExtras}}resize(e){if(this.viewportWidth=e.viewportWidth,this.viewportHeight=e.viewportHeight,this.renderTarget&&this.renderTarget.setSize(this.viewportWidth,this.viewportHeight),this.devicePixelRatio=e.devicePixelRatio??1,this.isMobile=e.isMobile??!1,this.viewWidth=this.computeViewWidth(Ks),this.camera=this.createCamera(),this.renderer.setPixelRatio(Math.min(this.devicePixelRatio||1,this.isMobile?1:1.5)),this.renderer.setSize(this.viewportWidth,this.viewportHeight,!1),this.activeEffect?.onResize)this.activeEffect.onResize(this.viewWidth,this.viewHeight,this.isMobile,this.viewportWidth,this.viewportHeight),this.activeEffect.setSnowSurfaces?.(this.snowSurfaces);else if(this.currentEffect!=="none"){const t=this.currentEffect;this.currentEffect="none",this.setEffect(t)}}destroy(){this.stop(),this.renderTarget&&(this.renderTarget.dispose(),this.renderTarget=null),this.maskQuad?.material&&this.maskQuad.material.dispose(),this.maskScene?.clear(),this.renderer.dispose(),this.scene.clear()}startLoop(){this.animationFrame==null&&(this.lastTimestamp=0,this.animationFrame=Bo(this.renderLoop))}stopLoop(){this.animationFrame!=null&&(Kf(this.animationFrame),this.animationFrame=null)}renderFrame(e){this.lastTimestamp===0&&(this.lastTimestamp=e);const t=Math.min((e-this.lastTimestamp)/1e3,.05);this.lastTimestamp=e,this.activeEffect?.update(t,e/1e3),this.smogOverlay?.update(t),this.windowDropletsOverlay?.update(t);const n=this.effectExtras.spatialMode==="gradient-mask";n&&(this.ensureGradientMaskPass(),this.renderer.setRenderTarget(this.renderTarget)),this.renderer.render(this.scene,this.camera),n&&(this.renderer.setRenderTarget(null),this.maskQuad.material.uniforms.tDiffuse.value=this.renderTarget.texture,this.renderer.render(this.maskScene,this.maskCamera)),this.animationFrame=Bo(this.renderLoop)}ensureGradientMaskPass(){if(this.renderTarget)return;this.renderTarget=new mn(this.viewportWidth,this.viewportHeight,{minFilter:ft,magFilter:ft,format:It,type:$t,stencilBuffer:!1}),this.maskCamera=new Bs(-1,1,1,-1,0,1),this.maskScene=new Lo;const e=new tt(2,2),t=new ht({uniforms:{tDiffuse:{value:null},uInner:{value:.32},uOuter:{value:.85}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
        uniform sampler2D tDiffuse;
        uniform float uInner;
        uniform float uOuter;
        varying vec2 vUv;
        void main() {
          vec4 tex = texture2D(tDiffuse, vUv);
          vec2 c = vUv - 0.5;
          float d = length(c) * 2.0;
          float mask = smoothstep(uInner, uOuter, d);
          gl_FragColor = vec4(tex.rgb, tex.a * mask);
        }
      `,transparent:!0,depthWrite:!1});this.maskQuad=new st(e,t),this.maskScene.add(this.maskQuad)}setEffect(e){if(this.disposeActiveEffect(),this.currentEffect=e,e==="none"){this.stopLoop();return}const t=this.createEffectInstance(e);if(!t){this.stopLoop(),this.currentEffect="none";return}this.activeEffect=t,this.activeEffect.setOpacity(this.opacity),this.snowSurfaces.length&&this.activeEffect.setSnowSurfaces&&this.activeEffect.setSnowSurfaces(this.snowSurfaces),this.scene.add(t.group),this.lastAppliedExtras={...this.effectExtras},this.updateSmogOverlay(),this.updateWindowDropletsOverlay(),this.startLoop()}disposeActiveEffect(){this.activeEffect&&(this.scene.remove(this.activeEffect.group),this.activeEffect.dispose(),this.activeEffect=null)}createEffectInstance(e){const t={viewWidth:this.viewWidth,viewHeight:this.viewHeight,viewportWidth:this.viewportWidth,viewportHeight:this.viewportHeight,isMobile:this.isMobile,effect:e,opacity:this.opacity,snowAccumulation:!!this.effectExtras.snowAccumulation,snowSurfaces:this.snowSurfaces,matrixRainColor:this.effectExtras.matrixRainColor,moonPosition:this.effectExtras.moonPosition};return e==="lightning"?vp(t):e==="sun_beams"?_p(t):e==="stars"?cp(t):e==="matrix"?op(t):e==="clouds"?gp(t):e==="hail"?xp(t):e.startsWith("rain")?ep(t):e==="snow_layered"?ip(t):e.startsWith("snow")?np(t):e.startsWith("fog")?mp(t):null}}function Qf(i,e){const t=e?.6:1;return i==="rain_storm"?{count:Math.floor(600*t),length:{min:1.1,max:1.5},speed:{min:1.4,max:1.9},timeScale:1.2,lightning:!0,lightningOnly:!1}:i==="rain_drizzle"?{count:Math.floor(250*t),length:{min:.6,max:.9},speed:{min:.3,max:.6},timeScale:.6,lightning:!1,lightningOnly:!1}:{count:Math.floor(480*t),length:{min:.9,max:1.2},speed:{min:1,max:1.3},timeScale:1,lightning:!1,lightningOnly:!1}}function ep(i){const e=new _t,t=Qf(i.effect,i.isMobile),n=t.count,r=new tt(.06,1),a=new Oo;a.index=r.index,a.attributes.position=r.attributes.position,a.attributes.uv=r.attributes.uv,a.instanceCount=n;const s=new Float32Array(n*3),o=new Float32Array(n),l=new Float32Array(n),c=new Float32Array(n),d=new Float32Array(n);for(let _=0;_<n;_++){const v=_*3;s[v]=qe.randFloatSpread(i.viewWidth+10),s[v+1]=qe.randFloatSpread(i.viewHeight),s[v+2]=Math.random()*.5,o[_]=qe.randFloat(t.speed.min,t.speed.max),l[_]=qe.randFloat(t.length.min,t.length.max),c[_]=qe.randFloat(.5,1.5),d[_]=Math.random()}a.setAttribute("instanceOffset",new Zt(s,3)),a.setAttribute("instanceSpeed",new Zt(o,1)),a.setAttribute("instanceLength",new Zt(l,1)),a.setAttribute("instanceSway",new Zt(c,1)),a.setAttribute("instancePhase",new Zt(d,1));const u={uTime:{value:0},uOpacity:{value:i.opacity/100},uViewSize:{value:new Ue(i.viewWidth,i.viewHeight)}},f=new ht({uniforms:u,vertexShader:`
      attribute vec3 instanceOffset;
      attribute float instanceSpeed;
      attribute float instanceLength;
      attribute float instanceSway;
      attribute float instancePhase;
      uniform float uTime;
      uniform vec2 uViewSize;
      varying float vAlpha;
      void main() {
        float progress = fract(uTime * instanceSpeed + instancePhase);
        float travel = (uViewSize.y * 0.5) - progress * (uViewSize.y + 20.0);
        vec3 transformed = position;
        transformed.y *= instanceLength;
        transformed.x += instanceOffset.x + sin(progress * 6.28318 + instancePhase) * instanceSway;
        transformed.y += travel + instanceOffset.y;
        transformed.z += -5.0 + instanceOffset.z;
        vAlpha = 1.0 - progress;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
      }
    `,fragmentShader:`
      uniform float uOpacity;
      varying float vAlpha;
      void main() {
        gl_FragColor = vec4(0.65, 0.75, 0.9, clamp(vAlpha * 0.85 * uOpacity, 0.0, 1.0));
      }
    `,transparent:!0,depthWrite:!1,blending:Yt}),h=new st(a,f);return h.frustumCulled=!1,e.add(h),{group:e,update(_){u.uTime.value+=_*t.timeScale,u.uViewSize.value.set(i.viewWidth,i.viewHeight)},setOpacity(_){u.uOpacity.value=Math.max(0,Math.min(1,_/100))},onResize(_,v){i.viewWidth=_,i.viewHeight=v,u.uViewSize.value.set(_,v)},dispose(){a.dispose(),f.dispose()}}}function tp(i,e){const t=e?.6:1;return Math.floor(i==="snow_storm"?1e3*t:600*t)}function np(i){const e=new _t,t=tp(i.effect,i.isMobile),n=new Float32Array(t*3),r=new Float32Array(t*3);for(let d=0;d<t;d++){const u=d*3;n[u]=qe.randFloatSpread(i.viewWidth+30),n[u+1]=qe.randFloatSpread(i.viewHeight+30),n[u+2]=Math.random()*4-2,r[u]=qe.randFloat(-.2,.2),r[u+1]=i.effect==="snow_storm"?qe.randFloat(-1.4,-.9):qe.randFloat(-.8,-.4),r[u+2]=qe.randFloat(-.05,.05)}const a=new Dt;a.setAttribute("position",new wt(n,3));const s=zo(),o=i.effect==="snow_storm"?.9:.75,l=new mr({map:s,transparent:!0,opacity:o*(i.opacity/100),sizeAttenuation:!1,size:i.effect==="snow_storm"?3.4:2.6,color:16777215,depthWrite:!1,depthTest:!1,blending:Yt}),c=new Zs(a,l);return c.frustumCulled=!1,e.add(c),{group:e,update(d){const u=a.attributes.position.array;for(let f=0;f<u.length;f+=3){u[f]+=r[f]*d*25,u[f+1]+=r[f+1]*d*25,u[f+2]+=r[f+2]*d*10;const h=i.viewWidth/2+15,_=i.viewHeight/2+15;u[f+1]<-_&&(u[f+1]=_,u[f]=qe.randFloatSpread(i.viewWidth+30)),u[f]<-h&&(u[f]=h),u[f]>h&&(u[f]=-h)}a.attributes.position.needsUpdate=!0},setOpacity(d){l.opacity=o*Math.max(0,Math.min(1,d/100))},onResize(d,u){i.viewWidth=d,i.viewHeight=u},dispose(){a.dispose(),l.dispose(),s.dispose()}}}const ko=[{sizeMin:24,sizeMax:40,speedFactor:.12,swayAmpMin:10,swayAmpMax:30,opacity:1,colorMin:255,colorMax:255},{sizeMin:20,sizeMax:28,speedFactor:.09,swayAmpMin:10,swayAmpMax:25,opacity:.85,colorMin:255,colorMax:255},{sizeMin:16,sizeMax:24,speedFactor:.07,swayAmpMin:10,swayAmpMax:20,opacity:.75,colorMin:255,colorMax:255},{sizeMin:12,sizeMax:18,speedFactor:.05,swayAmpMin:10,swayAmpMax:20,opacity:.65,colorMin:220,colorMax:229},{sizeMin:10,sizeMax:14,speedFactor:.03,swayAmpMin:10,swayAmpMax:20,opacity:.55,colorMin:210,colorMax:219},{sizeMin:8,sizeMax:12,speedFactor:.01,swayAmpMin:10,swayAmpMax:20,opacity:.4,colorMin:200,colorMax:209}];function ip(i){const e=new _t;let t=i.isMobile?180:300;const n=Math.floor(t/ko.length),r=zo(),a=ko.map(s=>{const o=new Float32Array(n*3),l=new Float32Array(n),c=new Float32Array(n),d=new Float32Array(n),u=new Float32Array(n);for(let m=0;m<n;m++){const p=m*3,b=s.sizeMin+Math.random()*(s.sizeMax-s.sizeMin);o[p]=qe.randFloatSpread(i.viewWidth+20),o[p+1]=qe.randFloatSpread(i.viewHeight+20),o[p+2]=Math.random()*2-1,l[m]=b*s.speedFactor*.15+Math.random()*.02,c[m]=s.swayAmpMin+Math.random()*(s.swayAmpMax-s.swayAmpMin),d[m]=Math.random()*Math.PI*2,u[m]=.01+Math.random()*.02}const f=new Dt;f.setAttribute("position",new wt(o,3));const h=(s.sizeMin+s.sizeMax)/2,_=new mr({map:r,transparent:!0,opacity:s.opacity*(i.opacity/100),sizeAttenuation:!1,size:h*.15,color:16777215,depthWrite:!1,depthTest:!1,blending:Yt}),v=new Zs(f,_);return v.frustumCulled=!1,e.add(v),{geo:f,mat:_,fallSpeeds:l,swayAmps:c,swayOffsets:d,swaySpeeds:u,baseOpacity:s.opacity}});return{group:e,update(s){a.forEach(o=>{const l=o.geo.attributes.position.array,c=s*60;for(let d=0;d<l.length/3;d++){const u=d*3;o.swayOffsets[d]+=o.swaySpeeds[d];const f=Math.sin(o.swayOffsets[d])*o.swayAmps[d]*.08;l[u]+=f*c,l[u+1]-=o.fallSpeeds[d]*c;const h=i.viewWidth/2+15,_=i.viewHeight/2+15;l[u+1]<-_&&(l[u+1]=_,l[u]=qe.randFloatSpread(i.viewWidth+20)),l[u]<-h&&(l[u]=h),l[u]>h&&(l[u]=-h)}o.geo.attributes.position.needsUpdate=!0})},setOpacity(s){const o=Math.max(0,Math.min(1,s/100));a.forEach(l=>{l.mat.opacity=l.baseOpacity*o})},onResize(s,o){i.viewWidth=s,i.viewHeight=o},dispose(){a.forEach(s=>{s.geo.dispose(),s.mat.dispose()}),r.dispose()}}}const Ho=["園","迎","簡","益","大","诶","比","西","迪","伊","弗","吉","尺","杰","开","艾","勒","马","娜"],rp="#00ff41",sp="#00cc33",ap=85;function op(i){const e=new _t,t=Math.max(256,Math.floor(i.viewportWidth/2)),n=Math.max(256,Math.floor(i.viewportHeight/2)),{canvas:r,ctx:a}=xr(t,n),s=yr(r);s.minFilter=ft,s.magFilter=ft;const o=new tt(i.viewWidth,i.viewHeight),l=new Ri({map:s,transparent:!0,opacity:.9*(i.opacity/100),depthWrite:!1}),c=new st(o,l);e.add(c);const d=[];let u=0;return{group:e,update(f){const h=r.width,_=r.height,v=h/i.viewportWidth;u+=f*1e3;const m=_/3,p=d.some(y=>y.y>m);if((d.length===0||p)&&u>=.8&&d.length<6){u=0;const y=h*.28,L=h*.72;let T=15,A;do{A=Math.random()<.5?30+Math.random()*(y-60):L+30+Math.random()*(h-L-60);const S=ap*(h/i.viewportWidth);if(!d.some(C=>Math.abs(C.x-A)<S))break}while(--T>0);if(T>0){const D=4+Math.floor(Math.random()*8);d.push({x:A,y:-80,chars:Array.from({length:D},()=>Ho[Math.floor(Math.random()*Ho.length)]),speed:(.15+Math.random()*.12)*v})}}a.fillStyle="rgba(0,0,0,0.08)",a.fillRect(0,0,h,_),a.font=`${Math.max(12,16*v)}px monospace`,a.textAlign="center",a.textBaseline="top";const w=h/2;for(let y=d.length-1;y>=0;y--){const L=d[y];if(L.y+=L.speed,L.y>_+150){d.splice(y,1);continue}const T=Math.abs(L.x-w),A=T<h*.2?.5+T/(h*.2)*.4:.9,D=16*v;for(let S=0;S<L.chars.length;S++){const M=1-S/L.chars.length*.5;a.globalAlpha=M*A,a.fillStyle=S===0?rp:sp,a.fillText(L.chars[S],L.x,L.y+S*D)}a.globalAlpha=1}s.needsUpdate=!0},setOpacity(f){l.opacity=.9*Math.max(0,Math.min(1,f/100))},onResize(f,h){i.viewWidth=f,i.viewHeight=h,c.geometry.dispose(),c.geometry=new tt(f,h)},dispose(){o.dispose(),l.dispose(),s.dispose()}}}function lp(i){return Math.floor(i?400*.6:400)}function cp(i){const e=new _t,t=lp(i.isMobile),n=new Float32Array(t*3),r=i.moonPosition;for(let u=0;u<t;u++){const f=u*3;n[f]=qe.randFloatSpread(i.viewWidth+20),n[f+1]=qe.randFloatSpread(i.viewHeight+20),n[f+2]=Math.random()*2-1}const a=new Dt;a.setAttribute("position",new wt(n,3));const s=Jf(),o=new mr({map:s,transparent:!0,opacity:.85*(i.opacity/100),sizeAttenuation:!1,size:2,color:15267071,depthWrite:!1,depthTest:!1,blending:Yt}),l=new Zs(a,o);l.frustumCulled=!1,e.add(l);let c=null;if(r&&typeof r.x=="number"&&typeof r.y=="number"){const u=(r.x-.5)*i.viewWidth,f=(.5-r.y)*i.viewHeight,h=new tt(i.viewWidth*.15,i.viewHeight*.12),_=new ht({uniforms:{uOpacity:{value:.5*(i.opacity/100)}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
        varying vec2 vUv;
        uniform float uOpacity;
        void main() {
          vec2 c = vUv - 0.5;
          float d = length(c);
          float alpha = smoothstep(0.5, 0.2, d) * uOpacity;
          gl_FragColor = vec4(0.95, 0.96, 1.0, alpha);
        }
      `,transparent:!0,depthWrite:!1,blending:Yt});c=new st(h,_),c.position.set(u,f,-1),c.renderOrder=1,e.add(c)}let d=0;return{group:e,update(u){d+=u*1.2,o.opacity=.85*(i.opacity/100)*(.8+.2*Math.sin(d))},setOpacity(u){o.opacity=.85*Math.max(0,Math.min(1,u/100))},onResize(u,f){i.viewWidth=u,i.viewHeight=f},dispose(){a.dispose(),o.dispose(),s.dispose(),c&&(c.geometry.dispose(),c.material.dispose())}}}const dp=55;function up(i){const e=i.viewWidth,t=i.viewHeight,{canvas:n,ctx:r}=xr(Math.max(256,Math.floor(i.viewportWidth/2)),Math.max(256,Math.floor(i.viewportHeight/2))),a=yr(n);a.minFilter=ft,a.magFilter=ft;const s=new tt(e,t),o=new Ri({map:a,transparent:!0,opacity:.95*(i.opacity/100),depthWrite:!1}),l=new st(s,o);l.renderOrder=5;const c=new _t;c.add(l);const d=[];let u=0,f=0;function h(v,m,p){for(const b of d){const w=v-b.x,y=m-b.y,L=dp+(p+b.size)*.5;if(w*w+y*y<L*L)return!0}return!1}function _(){return 25e3/(2+Math.random()*2)*(1.2+Math.random()*.8)}return{group:c,update(v){const m=n.width,p=n.height,b=Math.min(v*1e3,50);if(u+=b,f<=0&&(f=_()),u>=f){u=0,f=_();const w=.18,y=m*w,L=m*(1-w),T=Math.random()<.5?"left":"right",A=3+Math.random()*5;let D,S,M=12;do D=T==="left"?Math.random()*y:L+Math.random()*(m-L),S=Math.random()*p*.55;while(--M>0&&h(D,S,A));M>0&&d.push({x:D,y:S,size:A,phase:"appear",opacity:0,life:0,appearDur:300,restDur:2e3+Math.random()*2500,slideVel:8+Math.random()*6,slideAccel:.8+Math.random()*.6})}r.clearRect(0,0,m,p);for(let w=d.length-1;w>=0;w--){const y=d[w];if(y.life+=b,y.phase==="appear")y.opacity=Math.min(1,y.life/y.appearDur*1.8),y.life>=y.appearDur&&(y.phase="rest",y.life=0,y.opacity=1);else if(y.phase==="rest")y.life>=y.restDur&&(y.phase="slide",y.life=0);else{const L=b/1e3;y.slideVel=(y.slideVel||8)+y.slideAccel*L*60,y.y+=y.slideVel*L;const T=y.y/p;if(y.opacity=T<.85?1:Math.max(0,(1-T)/.15),y.y>p+y.size*2){d.splice(w,1);continue}}if(y.y<=p+y.size*2){r.save(),r.globalAlpha=y.opacity;const L=r.createRadialGradient(y.x-y.size*.3,y.y-y.size*.3,0,y.x,y.y,y.size*1.5);L.addColorStop(0,"rgba(220, 235, 255, 0.6)"),L.addColorStop(.4,"rgba(190, 210, 240, 0.45)"),L.addColorStop(.8,"rgba(160, 180, 210, 0.2)"),L.addColorStop(1,"rgba(140, 160, 190, 0)"),r.fillStyle=L,r.beginPath(),r.ellipse(y.x,y.y,y.size*.5,y.size*1.1,0,0,Math.PI*2),r.fill(),r.restore()}}a.needsUpdate=!0},setOpacity(v){o.opacity=.95*Math.max(0,Math.min(1,v/100))},dispose(){s.dispose(),o.dispose(),a.dispose()}}}function hp(i){const e=i.viewWidth,t=i.viewHeight,n=new tt(e,t),r={uTime:{value:0},uOpacity:{value:.18*(i.opacity/100)},uScale:{value:1.4},uResolution:{value:new Ue(e,t)}},a=new ht({uniforms:r,vertexShader:Js,fragmentShader:`
      varying vec2 vUv;
      uniform float uTime;
      uniform float uOpacity;
      uniform float uScale;
      uniform vec2 uResolution;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1,0)), u.x), mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
      }
      float fbm(vec2 p) {
        float v = 0.0, amp = 0.5;
        for (int i = 0; i < 4; i++) {
          v += amp * noise(p);
          p *= 2.0;
          amp *= 0.5;
        }
        return v;
      }
      void main() {
        vec2 aspect = vec2(uResolution.x / max(uResolution.y, 0.0001), 1.0);
        vec2 uv = (vUv - 0.5) * aspect + 0.5;
        uv *= uScale;
        uv += vec2(0.02, -0.04) * uTime;
        float d = fbm(uv);
        d = smoothstep(0.2, 0.65, d);
        float vMask = smoothstep(0.0, 0.55, vUv.y);
        vec3 color = vec3(0.55, 0.52, 0.48);
        gl_FragColor = vec4(color, d * vMask * uOpacity);
      }
    `,transparent:!0,depthWrite:!1,blending:Xt}),s=new st(n,a);s.renderOrder=10;const o=new _t;return o.add(s),{group:o,update(l){r.uTime.value+=l*.15},setOpacity(l){r.uOpacity.value=.18*Math.max(0,Math.min(1,l/100))},dispose(){n.dispose(),a.dispose()}}}function fp(i,e){const t=i==="fog_dense",n=t?.225:.11,r=e?.85:1,a=t?[{scale:1*r,speed:.28,intensity:1,flow:new Ue(.08,.02),low:.25,high:.78,contrast:1.1,color:[.86,.89,.95]},{scale:1.6*r,speed:.36,intensity:.85,flow:new Ue(-.05,.025),low:.2,high:.7,contrast:1.22,color:[.9,.92,.97]}]:[{scale:1.2*r,speed:.22,intensity:.75,flow:new Ue(.05,.015),low:.3,high:.82,contrast:1.15,color:[.88,.91,.96]},{scale:1.9*r,speed:.3,intensity:.55,flow:new Ue(-.03,.012),low:.25,high:.75,contrast:1.22,color:[.8,.84,.92]}];return{baseOpacity:n,layers:a}}const pp=`
  varying vec2 vUv;
  uniform float uTime;
  uniform float uOpacity;
  uniform float uScale;
  uniform vec2 uFlow;
  uniform vec2 uResolution;
  uniform float uLow;
  uniform float uHigh;
  uniform float uContrast;
  uniform vec3 uColor;
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1,0)), u.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, amp = 0.5;
    for (int i = 0; i < 5; i++) {
      v += amp * noise(p);
      p *= 2.0;
      amp *= 0.5;
    }
    return v;
  }
  void main() {
    vec2 aspect = vec2(uResolution.x / max(uResolution.y, 0.0001), 1.0);
    vec2 uv = (vUv - 0.5) * aspect + 0.5;
    uv *= uScale;
    uv += uFlow * uTime;
    float primary = fbm(uv);
    float detail = fbm(uv * 1.8 - uFlow.yx * (uTime * 0.35));
    float density = mix(primary, detail, 0.35);
    density = smoothstep(uLow, uHigh, density);
    density = pow(density, uContrast);
    gl_FragColor = vec4(uColor, density * uOpacity);
  }
`;function mp(i){const e=new _t,t=fp(i.effect,i.isMobile),n=t.layers.map(r=>{const a=new tt(i.viewWidth,i.viewHeight),s={uTime:{value:0},uOpacity:{value:t.baseOpacity*r.intensity*(i.opacity/100)},uScale:{value:r.scale},uFlow:{value:r.flow.clone()},uResolution:{value:new Ue(i.viewWidth,i.viewHeight)},uLow:{value:r.low},uHigh:{value:r.high},uContrast:{value:r.contrast},uColor:{value:new Ge(r.color[0],r.color[1],r.color[2])}},o=new ht({uniforms:s,vertexShader:Js,fragmentShader:pp,transparent:!0,depthWrite:!1,blending:Xt}),l=new st(a,o);return l.renderOrder=-3,e.add(l),{mesh:l,uniforms:s,config:r}});return{group:e,update(r){n.forEach(a=>{a.uniforms.uTime.value+=r*a.config.speed})},setOpacity(r){const a=Math.max(0,Math.min(1,r/100)),s=i.isMobile?.75:1;n.forEach(o=>{o.uniforms.uOpacity.value=t.baseOpacity*o.config.intensity*a*s})},onResize(r,a){i.viewWidth=r,i.viewHeight=a,n.forEach(s=>{s.uniforms.uResolution.value.set(r,a),s.mesh.geometry.dispose(),s.mesh.geometry=new tt(r,a)})},dispose(){n.forEach(r=>{r.mesh.geometry.dispose(),r.mesh.material.dispose()})}}}function _p(i){const e=new _t;let t=new tt(i.viewWidth,i.viewHeight);const n={uTime:{value:0},uOpacity:{value:i.opacity/100},uViewSize:{value:new Ue(i.viewWidth,i.viewHeight)}},r=new ht({uniforms:n,vertexShader:"varying vec3 vPosition; void main() { vPosition = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
      varying vec3 vPosition;
      uniform vec2 uViewSize;
      uniform float uTime;
      uniform float uOpacity;
      void main() {
        vec2 uv = vec2((vPosition.x / uViewSize.x) + 0.5, (vPosition.y / uViewSize.y) + 0.5);
        vec2 origin = vec2(1.1, 1.05);
        vec2 dir = origin - uv;
        float dist = length(dir);
        float angle = atan(dir.y, dir.x);
        float beams = sin(angle * 18.0 + uTime * 0.8) * 0.5 + 0.5;
        float intensity = smoothstep(0.6, 0.0, dist) * beams;
        float alpha = intensity * 0.65 * uOpacity;
        vec3 color = mix(vec3(1.0, 0.95, 0.8), vec3(1.0, 0.85, 0.4), dist);
        gl_FragColor = vec4(color, alpha);
      }
    `,transparent:!0,depthWrite:!1,blending:Yt}),a=new st(t,r);return a.position.set(0,0,-2),e.add(a),{group:e,update(s){n.uTime.value+=s},setOpacity(s){n.uOpacity.value=Math.max(0,Math.min(1,s/100))},onResize(s,o){i.viewWidth=s,i.viewHeight=o,n.uViewSize.value.set(s,o),t.dispose(),t=new tt(s,o),a.geometry=t},dispose(){t.dispose(),r.dispose()}}}function gp(i){const e=new _t,t=.6;let n=new tt(i.viewWidth,i.viewHeight*t);const r={uTime:{value:0},uOpacity:{value:i.opacity/100},uViewSize:{value:new Ue(i.viewWidth,i.viewHeight)},uScale:{value:i.isMobile?1.5:1}},a=`
    varying vec2 vUv;
    uniform float uTime;
    uniform float uOpacity;
    uniform float uScale;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
    }
    float fbm(vec2 p) {
      float v = 0.0, amp = 0.5, freq = 1.0;
      for (int i = 0; i < 6; i++) {
        v += amp * noise(p * freq);
        amp *= 0.5;
        freq *= 2.0;
      }
      return v;
    }
    void main() {
      vec2 uv = vUv * uScale;
      float time = uTime * 0.05;
      vec2 q = vec2(fbm(uv + vec2(time * 0.5, time * 0.2)), fbm(uv + vec2(1.0)));
      vec2 r = vec2(fbm(uv + q + vec2(1.7, 9.2) + 0.15 * time), fbm(uv + q + vec2(8.3, 2.8) + 0.126 * time));
      float f = fbm(uv + r);
      float cloud = smoothstep(0.2, 0.7, f);
      cloud *= smoothstep(0.0, 0.3, vUv.y);
      cloud *= smoothstep(1.0, 0.8, vUv.y);
      float shadow = smoothstep(0.3, 0.6, fbm(uv * 2.0 + r + vec2(0.5)));
      vec3 color = mix(vec3(0.81, 0.82, 0.89), vec3(1.0), shadow * 0.8 + 0.2);
      gl_FragColor = vec4(color, cloud * uOpacity * 0.24);
    }
  `,s=new ht({uniforms:r,vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:a,transparent:!0,depthWrite:!1,blending:Xt}),o=new st(n,s);return o.position.set(0,i.viewHeight*.25,-6),o.renderOrder=-2,e.add(o),{group:e,update(l){r.uTime.value+=l},setOpacity(l){r.uOpacity.value=Math.max(0,Math.min(1,l/100))},onResize(l,c,d){n.dispose(),n=new tt(l,c*t),o.geometry=n,r.uViewSize.value.set(l,c),r.uScale.value=d?1.5:1,o.position.set(0,c*.25,-6)},dispose(){n.dispose(),s.dispose()}}}function vp(i){const e=new _t,t=`
    varying vec2 vUv;
    uniform float uFlash;
    uniform vec2 uOrigin;
    uniform float uTime;
    float hash(float n) { return fract(sin(n) * 43758.5453); }
    float jaggedLine(vec2 uv, float anchor, float seed) {
      float segments = 8.0;
      float progress = clamp(1.0 - uv.y, 0.0, 0.999) * segments;
      float idx = floor(progress);
      float frac = fract(progress);
      float offsetA = hash(seed + idx) * 0.24 - 0.12;
      float offsetB = hash(seed + idx + 1.0) * 0.24 - 0.12;
      float offset = mix(offsetA, offsetB, smoothstep(0.0, 1.0, frac));
      float width = mix(0.006, 0.02, hash(seed + idx * 1.7));
      float target = anchor + offset;
      float dist = abs(uv.x - target);
      float intensity = smoothstep(width, 0.0, dist);
      float fade = smoothstep(0.0, 0.9, 1.0 - uv.y);
      return intensity * fade;
    }
    void main() {
      float seed = floor(uTime * 11.0);
      float core = jaggedLine(vUv, uOrigin.x, seed);
      float halo = jaggedLine(vUv, uOrigin.x + 0.008, seed + 2.0) * 0.4;
      float alpha = clamp((core + halo) * uFlash, 0.0, 1.0);
      gl_FragColor = vec4(1.0, 0.98, 0.9, alpha);
    }
  `,n={uFlash:{value:0},uOrigin:{value:new Ue(.85,1.05)},uTime:{value:0}};let r=new tt(i.viewWidth,i.viewHeight);const a=new ht({uniforms:n,vertexShader:Js,fragmentShader:t,transparent:!0,depthWrite:!1,depthTest:!1,blending:Yt}),s=new st(r,a);s.position.set(0,0,-6),s.renderOrder=25,e.add(s);let o=new tt(i.viewWidth,i.viewHeight);const l=new Ri({color:16777215,transparent:!0,opacity:0,depthWrite:!1,depthTest:!1,blending:Yt}),c=new st(o,l);c.position.set(0,0,-8),c.renderOrder=30,e.add(c);let d=qe.randFloat(1,3),u=0,f=.25;const h=Math.max(0,Math.min(1,i.opacity/100)),_=()=>{f=qe.randFloat(.18,.32),u=f,n.uFlash.value=1,n.uOrigin.value.set(qe.randFloat(.6,.95),qe.randFloat(.85,1.05)),l.opacity=Math.max(l.opacity,.55*h+.15)};return{group:e,update(v){if(d-=v,d<=0&&(d=qe.randFloat(1.5,4),_()),n.uTime.value+=v,u>0){u-=v;const m=Math.max(0,u/Math.max(f,.001));n.uFlash.value=Math.pow(m,1.4)*h}else n.uFlash.value>0&&(n.uFlash.value=Math.max(0,n.uFlash.value-v*8));l.opacity=Math.max(0,l.opacity-v*6)},setOpacity(v){const m=Math.max(0,Math.min(1,v/100));n.uFlash.value*=m/h},onResize(v,m){i.viewWidth=v,i.viewHeight=m,r.dispose(),r=new tt(v,m),s.geometry=r,o.dispose(),o=new tt(v,m),c.geometry=o},dispose(){r.dispose(),a.dispose(),o.dispose(),l.dispose()}}}function xp(i){const e=new _t,t=i.isMobile?10:15,n=new tt(.25,.25),r=new Oo;r.index=n.index,r.attributes.position=n.attributes.position,r.attributes.uv=n.attributes.uv,r.instanceCount=t;const a=new Float32Array(t*3),s=new Float32Array(t),o=new Float32Array(t),l=new Float32Array(t),c=new Float32Array(t);for(let h=0;h<t;h++){const _=h*3;a[_]=qe.randFloatSpread(i.viewWidth+10),a[_+1]=qe.randFloatSpread(i.viewHeight),a[_+2]=Math.random()*2,s[h]=qe.randFloat(2.8,4),o[h]=qe.randFloat(1.8,2.8),l[h]=Math.random()*Math.PI*2,c[h]=Math.random()}r.setAttribute("instanceOffset",new Zt(a,3)),r.setAttribute("instanceSpeed",new Zt(s,1)),r.setAttribute("instanceSize",new Zt(o,1)),r.setAttribute("instanceRotation",new Zt(l,1)),r.setAttribute("instancePhase",new Zt(c,1));const d={uTime:{value:0},uOpacity:{value:i.opacity/100},uViewSize:{value:new Ue(i.viewWidth,i.viewHeight)}},u=new ht({uniforms:d,vertexShader:`
      attribute vec3 instanceOffset;
      attribute float instanceSpeed;
      attribute float instanceSize;
      attribute float instanceRotation;
      attribute float instancePhase;
      uniform float uTime;
      uniform vec2 uViewSize;
      varying float vAlpha;
      void main() {
        float progress = fract(uTime * instanceSpeed + instancePhase);
        float travel = (uViewSize.y * 0.5) - progress * (uViewSize.y + 20.0);
        float angle = instanceRotation + uTime * instanceSpeed * 3.0;
        vec2 rotated = vec2(position.x * cos(angle) - position.y * sin(angle), position.x * sin(angle) + position.y * cos(angle));
        vec3 transformed = vec3(rotated * instanceSize, position.z);
        transformed.x += instanceOffset.x;
        transformed.y += travel + instanceOffset.y;
        transformed.z += -5.0 + instanceOffset.z;
        vAlpha = 1.0;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
      }
    `,fragmentShader:`
      uniform float uOpacity;
      varying float vAlpha;
      void main() {
        gl_FragColor = vec4(0.95, 0.98, 1.0, vAlpha * uOpacity);
      }
    `,transparent:!0,depthWrite:!1,blending:Xt}),f=new st(r,u);return f.frustumCulled=!1,e.add(f),{group:e,update(h){d.uTime.value+=h,d.uViewSize.value.set(i.viewWidth,i.viewHeight)},setOpacity(h){d.uOpacity.value=Math.max(0,Math.min(1,h/100))},onResize(h,_){i.viewWidth=h,i.viewHeight=_,d.uViewSize.value.set(h,_)},dispose(){r.dispose(),u.dispose()}}}const Go=typeof window<"u"&&typeof Worker<"u"&&typeof HTMLCanvasElement<"u"&&"transferControlToOffscreen"in HTMLCanvasElement.prototype;function yp(){try{if(typeof{url:Rt&&Rt.tagName.toUpperCase()==="SCRIPT"&&Rt.src||new URL("fork_u-weather_aware.js",document.baseURI).href}<"u"&&(Rt&&Rt.tagName.toUpperCase()==="SCRIPT"&&Rt.src||new URL("fork_u-weather_aware.js",document.baseURI).href))return new URL("data:text/javascript;base64,LyoqCiAqIER5bmFtaWMgV2VhdGhlciBXb3JrZXIgLSBydW5zIFdlYXRoZXJFZmZlY3RzQ29yZSBvbiBPZmZzY3JlZW5DYW52YXMKICovCmltcG9ydCB7IFdlYXRoZXJFZmZlY3RzQ29yZSB9IGZyb20gJy4uL3V0aWxzL3dlYXRoZXItZWZmZWN0cy1jb3JlLmpzJzsKCmxldCBjb3JlID0gbnVsbDsKCnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChldmVudCkgPT4gewogIGNvbnN0IGRhdGEgPSBldmVudC5kYXRhOwoKICBzd2l0Y2ggKGRhdGEudHlwZSkgewogICAgY2FzZSAnSU5JVCc6CiAgICAgIGluaXRDb3JlKGRhdGEpOwogICAgICBicmVhazsKICAgIGNhc2UgJ1NUQVJUJzoKICAgICAgY29yZT8uc3RhcnQoZGF0YS5lZmZlY3QsIGRhdGEub3BhY2l0eSwgZGF0YS5vcHRpb25zIHx8IHt9KTsKICAgICAgYnJlYWs7CiAgICBjYXNlICdTRVRfT1BBQ0lUWSc6CiAgICAgIGNvcmU/LnNldE9wYWNpdHkoZGF0YS5vcGFjaXR5KTsKICAgICAgYnJlYWs7CiAgICBjYXNlICdSRVNJWkUnOgogICAgICBpZiAoY29yZSkgewogICAgICAgIGNvcmUucmVzaXplKHsKICAgICAgICAgIHZpZXdwb3J0V2lkdGg6IGRhdGEudmlld3BvcnRXaWR0aCwKICAgICAgICAgIHZpZXdwb3J0SGVpZ2h0OiBkYXRhLnZpZXdwb3J0SGVpZ2h0LAogICAgICAgICAgZGV2aWNlUGl4ZWxSYXRpbzogZGF0YS5kZXZpY2VQaXhlbFJhdGlvLAogICAgICAgICAgaXNNb2JpbGU6IGRhdGEuaXNNb2JpbGUsCiAgICAgICAgfSk7CiAgICAgIH0KICAgICAgYnJlYWs7CiAgICBjYXNlICdTRVRfU05PV19TVVJGQUNFUyc6CiAgICAgIGNvcmU/LnNldFNub3dTdXJmYWNlcyhkYXRhLnN1cmZhY2VzIHx8IFtdKTsKICAgICAgYnJlYWs7CiAgICBjYXNlICdTVE9QJzoKICAgICAgY29yZT8uc3RvcCgpOwogICAgICBicmVhazsKICAgIGNhc2UgJ0RJU1BPU0UnOgogICAgICBpZiAoY29yZSkgewogICAgICAgIGNvcmUuZGVzdHJveSgpOwogICAgICAgIGNvcmUgPSBudWxsOwogICAgICB9CiAgICAgIGJyZWFrOwogIH0KfSk7CgpmdW5jdGlvbiBpbml0Q29yZShkYXRhKSB7CiAgdHJ5IHsKICAgIGlmIChjb3JlKSB7CiAgICAgIGNvcmUuZGVzdHJveSgpOwogICAgICBjb3JlID0gbnVsbDsKICAgIH0KICAgIGNvcmUgPSBuZXcgV2VhdGhlckVmZmVjdHNDb3JlKHsKICAgICAgY2FudmFzOiBkYXRhLmNhbnZhcywKICAgICAgdmlld3BvcnRXaWR0aDogZGF0YS52aWV3cG9ydFdpZHRoLAogICAgICB2aWV3cG9ydEhlaWdodDogZGF0YS52aWV3cG9ydEhlaWdodCwKICAgICAgZGV2aWNlUGl4ZWxSYXRpbzogZGF0YS5kZXZpY2VQaXhlbFJhdGlvID8/IDEsCiAgICAgIGlzTW9iaWxlOiBkYXRhLmlzTW9iaWxlID8/IGZhbHNlLAogICAgfSk7CiAgICBzZWxmLnBvc3RNZXNzYWdlKHsgdHlwZTogJ1JFQURZJyB9KTsKICB9IGNhdGNoIChlcnJvcikgewogICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgIHR5cGU6ICdFUlJPUicsCiAgICAgIGVycm9yOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvciksCiAgICB9KTsKICB9Cn0K",Rt&&Rt.tagName.toUpperCase()==="SCRIPT"&&Rt.src||new URL("fork_u-weather_aware.js",document.baseURI).href).href}catch{}const i=document.getElementsByTagName("script");for(let e=i.length-1;e>=0;e--){const t=i[e]?.src;if(t)try{return new URL("workers/dynamic-weather-worker.js",t).href}catch{return t.replace(/\/[^/?#]*([?#].*)?$/,"/workers/dynamic-weather-worker.js$1")}}return""}class Mp{constructor(e,t={}){this.container=e,this.canvas=document.createElement("canvas"),this.canvas.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:var(--weather-overlay-z,9998);",this.container.appendChild(this.canvas),this.viewportWidth=t.viewportWidth??window.innerWidth,this.viewportHeight=t.viewportHeight??window.innerHeight,this.isMobile=t.isMobile??(window.innerWidth<600||"ontouchstart"in window),this.devicePixelRatio=t.devicePixelRatio??this.effectiveDpr(),this.worker=null,this.workerState="idle",this.workerQueue=[],this.fallbackCore=null,this.currentEffect="none",this.opacity=100,this.effectOptions={},this.resizeHandler=()=>this.handleResize(),window.addEventListener("resize",this.resizeHandler),Go?this.initWorker():this.ensureFallbackCore()}effectiveDpr(){const e=window.ForkUWeatherAwareConfig||{};let t=window.devicePixelRatio||1;return this.isMobile&&e.mobile_limit_dpr&&(t=Math.min(t,2)),t}useWorkerPath(){return Go&&this.workerState!=="failed"&&this.workerState==="ready"}initWorker(){if(!this.worker)try{let e;try{e=new URL("data:text/javascript;base64,LyoqCiAqIER5bmFtaWMgV2VhdGhlciBXb3JrZXIgLSBydW5zIFdlYXRoZXJFZmZlY3RzQ29yZSBvbiBPZmZzY3JlZW5DYW52YXMKICovCmltcG9ydCB7IFdlYXRoZXJFZmZlY3RzQ29yZSB9IGZyb20gJy4uL3V0aWxzL3dlYXRoZXItZWZmZWN0cy1jb3JlLmpzJzsKCmxldCBjb3JlID0gbnVsbDsKCnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChldmVudCkgPT4gewogIGNvbnN0IGRhdGEgPSBldmVudC5kYXRhOwoKICBzd2l0Y2ggKGRhdGEudHlwZSkgewogICAgY2FzZSAnSU5JVCc6CiAgICAgIGluaXRDb3JlKGRhdGEpOwogICAgICBicmVhazsKICAgIGNhc2UgJ1NUQVJUJzoKICAgICAgY29yZT8uc3RhcnQoZGF0YS5lZmZlY3QsIGRhdGEub3BhY2l0eSwgZGF0YS5vcHRpb25zIHx8IHt9KTsKICAgICAgYnJlYWs7CiAgICBjYXNlICdTRVRfT1BBQ0lUWSc6CiAgICAgIGNvcmU/LnNldE9wYWNpdHkoZGF0YS5vcGFjaXR5KTsKICAgICAgYnJlYWs7CiAgICBjYXNlICdSRVNJWkUnOgogICAgICBpZiAoY29yZSkgewogICAgICAgIGNvcmUucmVzaXplKHsKICAgICAgICAgIHZpZXdwb3J0V2lkdGg6IGRhdGEudmlld3BvcnRXaWR0aCwKICAgICAgICAgIHZpZXdwb3J0SGVpZ2h0OiBkYXRhLnZpZXdwb3J0SGVpZ2h0LAogICAgICAgICAgZGV2aWNlUGl4ZWxSYXRpbzogZGF0YS5kZXZpY2VQaXhlbFJhdGlvLAogICAgICAgICAgaXNNb2JpbGU6IGRhdGEuaXNNb2JpbGUsCiAgICAgICAgfSk7CiAgICAgIH0KICAgICAgYnJlYWs7CiAgICBjYXNlICdTRVRfU05PV19TVVJGQUNFUyc6CiAgICAgIGNvcmU/LnNldFNub3dTdXJmYWNlcyhkYXRhLnN1cmZhY2VzIHx8IFtdKTsKICAgICAgYnJlYWs7CiAgICBjYXNlICdTVE9QJzoKICAgICAgY29yZT8uc3RvcCgpOwogICAgICBicmVhazsKICAgIGNhc2UgJ0RJU1BPU0UnOgogICAgICBpZiAoY29yZSkgewogICAgICAgIGNvcmUuZGVzdHJveSgpOwogICAgICAgIGNvcmUgPSBudWxsOwogICAgICB9CiAgICAgIGJyZWFrOwogIH0KfSk7CgpmdW5jdGlvbiBpbml0Q29yZShkYXRhKSB7CiAgdHJ5IHsKICAgIGlmIChjb3JlKSB7CiAgICAgIGNvcmUuZGVzdHJveSgpOwogICAgICBjb3JlID0gbnVsbDsKICAgIH0KICAgIGNvcmUgPSBuZXcgV2VhdGhlckVmZmVjdHNDb3JlKHsKICAgICAgY2FudmFzOiBkYXRhLmNhbnZhcywKICAgICAgdmlld3BvcnRXaWR0aDogZGF0YS52aWV3cG9ydFdpZHRoLAogICAgICB2aWV3cG9ydEhlaWdodDogZGF0YS52aWV3cG9ydEhlaWdodCwKICAgICAgZGV2aWNlUGl4ZWxSYXRpbzogZGF0YS5kZXZpY2VQaXhlbFJhdGlvID8/IDEsCiAgICAgIGlzTW9iaWxlOiBkYXRhLmlzTW9iaWxlID8/IGZhbHNlLAogICAgfSk7CiAgICBzZWxmLnBvc3RNZXNzYWdlKHsgdHlwZTogJ1JFQURZJyB9KTsKICB9IGNhdGNoIChlcnJvcikgewogICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgIHR5cGU6ICdFUlJPUicsCiAgICAgIGVycm9yOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvciksCiAgICB9KTsKICB9Cn0K",Rt&&Rt.tagName.toUpperCase()==="SCRIPT"&&Rt.src||new URL("fork_u-weather_aware.js",document.baseURI).href).href}catch{e=yp()}if(!e){this.handleWorkerFailure();return}this.worker=new Worker(e),this.worker.onmessage=n=>{n.data?.type==="READY"?(this.workerState="ready",this.flushWorkerQueue(),this.currentEffect!=="none"&&this.postWorkerMessage({type:"START",effect:this.currentEffect,opacity:this.opacity,options:this.effectOptions})):n.data?.type==="ERROR"&&(console.error("[Weather Overlay] Worker error:",n.data.error),this.handleWorkerFailure())},this.worker.onerror=n=>{console.error("[Weather Overlay] Worker init failed:",n),this.handleWorkerFailure()};const t=this.canvas.transferControlToOffscreen();this.workerState="pending",this.worker.postMessage({type:"INIT",canvas:t,viewportWidth:this.viewportWidth,viewportHeight:this.viewportHeight,devicePixelRatio:this.devicePixelRatio,isMobile:this.isMobile},[t])}catch(e){console.error("[Weather Overlay] Worker creation failed:",e),this.handleWorkerFailure()}}handleWorkerFailure(){this.workerState="failed",this.worker&&(this.worker.terminate(),this.worker=null),this.flushWorkerQueue(!0),this.recreateCanvas(),this.fallbackCore&&(this.fallbackCore.destroy(),this.fallbackCore=null),this.ensureFallbackCore(),this.currentEffect!=="none"&&this.fallbackCore?.start(this.currentEffect,this.opacity,this.effectOptions)}recreateCanvas(){this.canvas?.parentElement&&this.canvas.parentElement.removeChild(this.canvas),this.canvas=document.createElement("canvas"),this.canvas.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:var(--weather-overlay-z,9998);",this.container.appendChild(this.canvas)}ensureFallbackCore(){this.fallbackCore||(this.fallbackCore=new jf({canvas:this.canvas,viewportWidth:this.viewportWidth,viewportHeight:this.viewportHeight,devicePixelRatio:this.devicePixelRatio,isMobile:this.isMobile}))}postWorkerMessage(e){this.workerState==="ready"&&this.worker?this.worker.postMessage(e):this.workerQueue.push(e)}flushWorkerQueue(e=!1){if(e||!this.worker){this.workerQueue=[];return}for(const t of this.workerQueue)this.worker.postMessage(t);this.workerQueue=[]}handleResize(){this.viewportWidth=window.innerWidth,this.viewportHeight=window.innerHeight,this.isMobile=window.innerWidth<600||"ontouchstart"in window,this.devicePixelRatio=this.effectiveDpr(),this.useWorkerPath()?this.postWorkerMessage({type:"RESIZE",viewportWidth:this.viewportWidth,viewportHeight:this.viewportHeight,devicePixelRatio:this.devicePixelRatio,isMobile:this.isMobile}):(this.ensureFallbackCore(),this.fallbackCore.resize({viewportWidth:this.viewportWidth,viewportHeight:this.viewportHeight,devicePixelRatio:this.devicePixelRatio,isMobile:this.isMobile}))}start(e,t=100,n={}){if(this.opacity=Math.max(0,Math.min(100,t)),this.effectOptions=n,e==="none"){this.stop();return}this.currentEffect=e,this.useWorkerPath()?this.postWorkerMessage({type:"START",effect:e,opacity:this.opacity,options:this.effectOptions}):(this.ensureFallbackCore(),this.fallbackCore.start(e,this.opacity,this.effectOptions))}stop(){this.currentEffect="none",this.useWorkerPath()?this.postWorkerMessage({type:"STOP"}):this.fallbackCore?.stop()}setOpacity(e){this.opacity=Math.max(0,Math.min(100,e)),this.useWorkerPath()?this.postWorkerMessage({type:"SET_OPACITY",opacity:this.opacity}):this.fallbackCore?.setOpacity(this.opacity)}resize(e={}){this.viewportWidth=e.viewportWidth??window.innerWidth,this.viewportHeight=e.viewportHeight??window.innerHeight,this.isMobile=e.isMobile??(window.innerWidth<600||"ontouchstart"in window),this.devicePixelRatio=e.devicePixelRatio??this.effectiveDpr(),this.useWorkerPath()?this.postWorkerMessage({type:"RESIZE",viewportWidth:this.viewportWidth,viewportHeight:this.viewportHeight,devicePixelRatio:this.devicePixelRatio,isMobile:this.isMobile}):(this.ensureFallbackCore(),this.fallbackCore.resize({viewportWidth:this.viewportWidth,viewportHeight:this.viewportHeight,devicePixelRatio:this.devicePixelRatio,isMobile:this.isMobile}))}setStyle(e){e&&typeof e=="object"&&Object.assign(this.canvas.style,e)}destroy(){this.stop(),window.removeEventListener("resize",this.resizeHandler),this.worker&&(this.postWorkerMessage({type:"DISPOSE"}),this.worker.terminate(),this.worker=null),this.workerState="idle",this.workerQueue=[],this.fallbackCore&&(this.fallbackCore.destroy(),this.fallbackCore=null),this.canvas?.parentNode&&this.canvas.parentNode.removeChild(this.canvas)}}function Vo(i){if(!i)return"none";const e=String(i).toLowerCase().replace(/_/g,"-");return e==="lightning-rainy"||e==="lightning_rainy"||e==="pouring"?"rain_storm":e==="rainy-drizzle"||e==="rainy_drizzle"?"rain_drizzle":e==="rainy"?"rain":e==="hail"?"hail":e==="lightning"?"lightning":e==="snowy"||e==="snow"?"snow_gentle":e==="snowy-rainy"||e==="snowy_rainy"?"snow_storm":e==="snowy2"?"snow_layered":e==="snowy3"?"snow_gentle":e==="fog"||e==="foggy"?"fog_light":e==="sunny"||e==="clear"||e==="sunny2"?"sun_beams":e==="clear-night"||e==="clear_night"?"stars":e==="cloudy"||e==="partlycloudy"||e==="partly-cloudy"||e==="partly_cloudy"||e==="windy-variant"||e==="windy_variant"||e==="windy"?"clouds":"none"}const pi=[],Wo="",Sp="",Ep=!1;function _m(i,e=null){}function wp(i,e=null){console.warn("[Weather Overlay] ⚠️",i,e??"")}function Di(i,e=null){console.error("[Weather Overlay] ❌",i,e??"")}function mi(){const i=document.querySelector("home-assistant");return i?.hass?i:null}function bp(){return(window.ForkUWeatherAwareConfig||{}).weather_entity||"weather.openweathermap"}function Xo(){try{const i=mi();if(!i)return null;const e=window.ForkUWeatherAwareConfig||{},t=bp();if(e.development_mode&&e.test_effect&&e.test_effect!=="Use Real Weather"){let s=e.test_effect;return s==="snowy"&&e.snowy_variant==="snowy2"&&(s="snowy2"),s}const n=i.hass.states[t];if(!n)return Di(`Weather entity '${t}' not found`),null;let r=(n.state||"").toLowerCase().replace(/_/g,"-");const a=parseFloat(e.drizzle_precipitation_max)||2.5;if(r==="rainy"){const s=n.attributes?.precipitation!=null?parseFloat(n.attributes.precipitation):n.attributes?.precipitation_1h!=null?parseFloat(n.attributes.precipitation_1h):NaN;!isNaN(s)&&s>0&&s<=a&&(r="rainy-drizzle")}return r}catch(i){return Di("Error getting weather state:",i),null}}function Yo(){try{if((window.ForkUWeatherAwareConfig||{}).enabled===!1)return!1;if(!Wo)return!0;const e=mi();if(!e)return!0;const t=e.hass.states[Wo];return t?t.state==="on":!0}catch(i){return Di("Error checking overlay:",i),!0}}function $o(){if(!pi?.length)return!0;const e=window.location.pathname.split("/").filter(Boolean);if(e.length===0)return pi.includes("lovelace")||pi.includes("home");if(e[0]==="lovelace"){const t=e.length===1?"lovelace":e[1];return pi.includes(t)}for(const t of e)if(pi.includes(t))return!0;return pi.includes(e[e.length-1])}function js(){return window.innerWidth<600||"ontouchstart"in window}function Tp(){try{const i=document.createElement("canvas");return!!(i.getContext("webgl2")||i.getContext("webgl")||i.getContext("experimental-webgl"))}catch{return!1}}function qo(){const i=window.ForkUWeatherAwareConfig||{};let e=window.devicePixelRatio||1;return js()&&i.mobile_limit_dpr&&(e=Math.min(e,2)),e}function Zo(){const i=window.ForkUWeatherAwareConfig||{},e=i.pm25_entity,t=i.pm4_entity,n=i.pm10_entity,r=i.smog_threshold_pm25??35,a=i.smog_threshold_pm4??50,s=i.smog_threshold_pm10??50,o=mi();if(!o?.hass)return!1;if(e){const l=o.hass.states[e];if(l&&l.state!=="unavailable"&&l.state!=="unknown"){const c=parseFloat(l.state);if(!isNaN(c)&&c>=r)return!0}}if(t){const l=o.hass.states[t];if(l&&l.state!=="unavailable"&&l.state!=="unknown"){const c=parseFloat(l.state);if(!isNaN(c)&&c>=a)return!0}}if(n){const l=o.hass.states[n];if(l&&l.state!=="unavailable"&&l.state!=="unknown"){const c=parseFloat(l.state);if(!isNaN(c)&&c>=s)return!0}}return!1}function Bn(i){return(window.ForkUWeatherAwareConfig||{})[i]!==!1}function Ap(){const e=(window.ForkUWeatherAwareConfig||{}).gaming_mode_entity;if(!e||typeof e!="string"||!e.trim())return!1;const t=mi();if(!t?.hass?.states)return!1;const n=t.hass.states[e];return!!(n&&String(n.state).toLowerCase()==="on")}let Mr=null,Ko=0;const Cp=3e3;function Jo(){const i=Date.now();if(i-Ko<Cp&&Mr)return Mr;Ko=i;try{const e=window.ForkUWeatherAwareConfig||{},t=mi();if(!t?.hass)return{x:.75,y:.12};const n=e.moon_position_entity,r=e.moon_phase_entity,a=e.moon_azimuth_entity,s=e.moon_altitude_entity;let o={x:.75,y:.12};for(const l of[n,r].filter(Boolean)){const c=t.hass.states[l];if(!c?.attributes)continue;const d=c.attributes,u=parseFloat(d.azimuth??d.moon_azimuth_deg),f=parseFloat(d.elevation??d.altitude??d.moon_altitude_deg);if(!isNaN(u)&&!isNaN(f)&&f>0){o.x=Math.max(0,Math.min(1,(u-90)/180)),o.y=.08+.22*(1-Math.min(90,f)/90);break}}if(a||s){const l=a?t.hass.states[a]:null,c=s?t.hass.states[s]:null,d=l?parseFloat(l.state):NaN,u=c?parseFloat(c.state):NaN;!isNaN(d)&&!isNaN(u)&&u>0&&(o.x=Math.max(0,Math.min(1,(d-90)/180)),o.y=.08+.22*(1-Math.min(90,u)/90))}return Mr=o,o}catch{return Mr||{x:.75,y:.12}}}function Rp(){const i=(window.ForkUWeatherAwareConfig||{}).spatial_mode||"foreground";return{foreground:9998,background:1,bubble:5e3,"gradient-mask":9997}[i]??9998}function jo(i){const e=window.ForkUWeatherAwareConfig||{},t={rain:e.enable_rain,rain_storm:e.enable_rain&&e.enable_lightning_effect,rain_drizzle:e.enable_rain,snow_gentle:e.enable_snow,snow_storm:e.enable_snow,snow_layered:e.enable_snow,fog_light:e.enable_fog,fog_dense:e.enable_fog,sun_beams:e.enable_sun_glow,clouds:e.enable_clouds,hail:e.enable_hail,lightning:e.enable_lightning_effect,stars:e.enable_stars,matrix:e.enable_matrix};return i&&i!=="none"&&t[i]===!1?"none":i}let Gt=null,ut=null,Qs=null,ea=0,Qo=window.location.pathname;function Ip(){ut&&ut.style.setProperty("--weather-overlay-z",String(Rp()))}function el(){const i=Date.now();if(i-ea<1e3)return;const e=Yo(),t=$o();if(!e||!t){Gt&&Gt.stop(),ut&&(ut.style.display="none");return}if(ea=i,ut&&(ut.style.display="block"),window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches){Gt&&Gt.stop(),ut&&(ut.style.display="none");return}const r=(window.ForkUWeatherAwareConfig||{}).gaming_matrix_only&&Ap()&&Bn("enable_matrix"),a=r?null:Xo(),s=r?"matrix":jo(Vo(a));(a!==Qs||!Gt)&&(Qs=a);const o=Bn("enable_smog_effect")&&Zo(),l=s==="stars"&&Bn("enable_moon_glow")?Jo():null,d=["rain","rain_storm","rain_drizzle","snow_storm"].includes(s)&&Bn("enable_window_droplets"),u=(window.ForkUWeatherAwareConfig||{}).spatial_mode||"foreground";Gt&&Gt.start(s,100,{smogActive:o,moonPosition:l,windowDroplets:d,spatialMode:u})}function Pp(){Gt&&Gt.resize({viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,isMobile:js(),devicePixelRatio:qo()})}function Up(){if(!ut){if(!Tp()){wp("WebGL not supported - weather overlay disabled");return}ut=document.createElement("div"),ut.id="fork-u-weather-overlay",ut.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:var(--weather-overlay-z,9998);",Ip(),document.body.appendChild(ut);try{if(Gt=new Mp(ut,{viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,isMobile:js(),devicePixelRatio:qo()}),!Yo()||!$o())ut.style.display="none";else{const i=Xo(),e=jo(Vo(i));Qs=i;const t=Bn("enable_smog_effect")&&Zo(),n=e==="stars"&&Bn("enable_moon_glow")?Jo():null,a=["rain","rain_storm","rain_drizzle","snow_storm"].includes(e)&&Bn("enable_window_droplets"),s=(window.ForkUWeatherAwareConfig||{}).spatial_mode||"foreground";Gt.start(e,100,{smogActive:t,moonPosition:n,windowDroplets:a,spatialMode:s})}}catch(i){Di("Weather overlay init failed:",i),ut?.parentNode&&ut.parentNode.removeChild(ut);return}setInterval(el,1e3),window.addEventListener("resize",Pp),setInterval(()=>{window.location.pathname!==Qo&&(Qo=window.location.pathname,ea=0,el())},500)}}function tl(){let i=0;const e=setInterval(()=>{i++,mi()?(clearInterval(e),Up()):i>=60&&(clearInterval(e),Di("Home Assistant not found after 30s"))},500)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",tl):tl(),function(){const i=window.ForkUWeatherAwareDefaultConfig||{enabled:!0,weather_entity:"weather.openweathermap",development_mode:!1,test_effect:"Use Real Weather",sun_entity:"sun.sun",moon_phase_entity:null,uv_index_entity:null,moon_position_entity:null,moon_azimuth_entity:null,moon_altitude_entity:null,moon_distance_entity:null,gaming_mode_entity:null,pm25_entity:null,pm4_entity:null,pm10_entity:null,smog_threshold_pm25:35,smog_threshold_pm4:50,smog_threshold_pm10:50,cloud_coverage_entity:null,wind_speed_entity:null,wind_direction_entity:null,precipitation_entity:null,lightning_counter_entity:null,lightning_distance_entity:null,debug_precipitation:null,debug_wind_speed:null,debug_wind_direction:null,debug_lightning_distance:null,debug_lightning_counter:null,debug_cloud_coverage:null,cloud_speed_multiplier:1,wind_sway_factor:.7,spatial_mode:"foreground",enable_rain:!0,enable_snow:!0,enable_clouds:!0,enable_fog:!0,enable_smog_effect:!0,enable_sun_glow:!0,enable_moon_glow:!0,enable_stars:!0,enable_hail:!0,enable_lightning_effect:!0,enable_matrix:!0,enable_window_droplets:!0,stars_require_moon:!1,mobile_limit_dpr:!0,mobile_reduce_particles:!0,mobile_snowy2_light:!0,mobile_smog_simple:!1,mobile_30fps:!1,gaming_matrix_only:!1,snowy_variant:"snowy2"};class e extends HTMLElement{connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._scheduleEditorCheck()}_scheduleEditorCheck(){this._editorCheckScheduled||(this._editorCheckScheduled=!0,requestAnimationFrame(()=>{this._editorCheckScheduled=!1,this._config&&this._render()}))}setConfig(s){const o=Object.assign({},i,s||{});window.ForkUWeatherAwareConfig=o,this._config=o,this._render()}set hass(s){if(this._hass=s,this._config&&!window.ForkUWeatherAwareConfig&&(window.ForkUWeatherAwareConfig=this._config),s?.themes?.darkMode!==void 0){const o=window.ForkUWeatherAwareConfig||{};window.ForkUWeatherAwareConfig=Object.assign({},o,{theme_mode:s.themes.darkMode?"dark":"light"})}}_isInEditorPreview(){let s=this;for(;s;){if(s.nodeType===1&&s.classList&&(s.classList.contains("element-preview")||s.tagName&&s.tagName.toLowerCase().includes("hui-dialog-edit-card")))return!0;const o=s.getRootNode?s.getRootNode():s;s=(o instanceof ShadowRoot?o.host:s.parentNode)||null}return!1}_render(){this.shadowRoot||this.attachShadow({mode:"open"});const s=this._config||window.ForkUWeatherAwareConfig||i,o=this._isInEditorPreview(),l=!s.development_mode&&!o;this.style.display=l?"none":"",this.shadowRoot.innerHTML=`
        <ha-card header="Fork U - Weather Aware" style="${l?"display:none":""}">
          <div class="card-content">
            <p>Fullscreen, smooth weather overlay running on this dashboard.</p>
            <p><strong>Weather entity:</strong> ${s.weather_entity||"not set"}</p>
            <p><strong>Development mode:</strong> ${s.development_mode?"on":"off"}</p>
          </div>
        </ha-card>
      `}getCardSize(){const s=this._config||window.ForkUWeatherAwareConfig||{},o=this._isInEditorPreview&&this._isInEditorPreview();return!s.development_mode&&!o?0:1}static getConfigElement(){return document.createElement("fork-u-weather-aware-editor")}static getStubConfig(){return{enabled:!0,weather_entity:"weather.openweathermap",development_mode:!1,test_effect:"Use Real Weather"}}}typeof window.customCards>"u"&&(window.customCards=[]),window.customCards.push({type:"fork-u-weather-aware-card",name:"Fork U - Weather Aware",description:"Fullscreen weather overlay with rain, snow, lightning, fog and more.",preview:!1});function t(a){return a==null?"":String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function n(a,s,o){const l={value:"",label:"— None —"};if(!a||!a.states)return o?[l,{value:o,label:"Current: "+o}]:[l];const c=Object.keys(a.states).filter(u=>s.some(f=>u.startsWith(f+"."))).sort(),d=[l];return c.forEach(u=>d.push({value:u,label:u})),o&&o.trim()&&!c.includes(o)&&d.splice(1,0,{value:o,label:"Current: "+o}),d}class r extends HTMLElement{setConfig(s){this._config=Object.assign({},i,s||{}),this._config&&(window.ForkUWeatherAwareConfig=this._config),this.shadowRoot?this._updateFormValues(this._config):(this.attachShadow({mode:"open"}),this._render())}set hass(s){this._hass=s,s&&this.shadowRoot&&this._config&&!this._entitySelectsPopulated&&this._populateEntitySelects()}_populateEntitySelects(){const s=this.shadowRoot,o=this._hass,l=this._config||{};if(!s||!o)return;this._entitySelectsPopulated=!0,[{id:"weather_entity",domains:["weather"]},{id:"sun_entity",domains:["sun"]},{id:"moon_phase_entity",domains:["sensor"]},{id:"uv_index_entity",domains:["sensor"]},{id:"moon_position_entity",domains:["sensor"]},{id:"moon_azimuth_entity",domains:["sensor"]},{id:"moon_altitude_entity",domains:["sensor"]},{id:"moon_distance_entity",domains:["sensor"]},{id:"wind_speed_entity",domains:["sensor"]},{id:"wind_direction_entity",domains:["sensor"]},{id:"cloud_coverage_entity",domains:["sensor"]},{id:"precipitation_entity",domains:["sensor"]},{id:"pm25_entity",domains:["sensor"]},{id:"pm4_entity",domains:["sensor"]},{id:"pm10_entity",domains:["sensor"]},{id:"gaming_mode_entity",domains:["input_boolean"]},{id:"lightning_counter_entity",domains:["sensor"]},{id:"lightning_distance_entity",domains:["sensor"]}].forEach(({id:d,domains:u})=>{const f=s.getElementById(d+"_list");if(!f)return;const h=l[d]||"",_=n(o,u,h);f.innerHTML=_.filter(v=>v.value).map(v=>`<option value="${t(v.value)}">${t(v.label)}</option>`).join("")})}_updateFormValues(s){const o=this.shadowRoot;if(!o||!s)return;const l=(d,u)=>{const f=o.getElementById(d);f&&(f.type==="checkbox"?f.checked=!!u:f.value=u!=null?String(u):"")};l("enabled",s.enabled),l("weather_entity",s.weather_entity),l("sun_entity",s.sun_entity),l("moon_phase_entity",s.moon_phase_entity),l("uv_index_entity",s.uv_index_entity),l("moon_position_entity",s.moon_position_entity),l("moon_azimuth_entity",s.moon_azimuth_entity),l("moon_altitude_entity",s.moon_altitude_entity),l("moon_distance_entity",s.moon_distance_entity),l("gaming_mode_entity",s.gaming_mode_entity),l("pm25_entity",s.pm25_entity),l("pm4_entity",s.pm4_entity),l("pm10_entity",s.pm10_entity),l("smog_threshold_pm25",s.smog_threshold_pm25),l("smog_threshold_pm4",s.smog_threshold_pm4),l("smog_threshold_pm10",s.smog_threshold_pm10),l("cloud_coverage_entity",s.cloud_coverage_entity),l("wind_speed_entity",s.wind_speed_entity),l("wind_direction_entity",s.wind_direction_entity),l("precipitation_entity",s.precipitation_entity),l("lightning_counter_entity",s.lightning_counter_entity),l("lightning_distance_entity",s.lightning_distance_entity),l("cloud_speed_multiplier",s.cloud_speed_multiplier),l("wind_sway_factor",s.wind_sway_factor),l("enable_rain",s.enable_rain),l("enable_snow",s.enable_snow),l("enable_clouds",s.enable_clouds),l("enable_fog",s.enable_fog),l("enable_smog_effect",s.enable_smog_effect),l("enable_sun_glow",s.enable_sun_glow),l("enable_moon_glow",s.enable_moon_glow),l("enable_stars",s.enable_stars),l("enable_hail",s.enable_hail),l("enable_lightning_effect",s.enable_lightning_effect),l("enable_matrix",s.enable_matrix),l("enable_window_droplets",s.enable_window_droplets),l("stars_require_moon",s.stars_require_moon),l("drizzle_precipitation_max",s.drizzle_precipitation_max),["rain","snow","clouds","fog","smog","hail","lightning","stars","matrix"].forEach(d=>l("speed_factor_"+d,s["speed_factor_"+d])),l("development_mode",s.development_mode),l("debug_precipitation",s.debug_precipitation),l("debug_wind_speed",s.debug_wind_speed),l("debug_wind_direction",s.debug_wind_direction),l("debug_lightning_distance",s.debug_lightning_distance),l("debug_lightning_counter",s.debug_lightning_counter),l("debug_cloud_coverage",s.debug_cloud_coverage),l("mobile_limit_dpr",s.mobile_limit_dpr),l("mobile_reduce_particles",s.mobile_reduce_particles),l("mobile_snowy2_light",s.mobile_snowy2_light),l("mobile_smog_simple",s.mobile_smog_simple),l("mobile_30fps",s.mobile_30fps),l("gaming_matrix_only",s.gaming_matrix_only),l("snowy_variant",s.snowy_variant||"snowy2"),l("spatial_mode",s.spatial_mode||"foreground");const c=s.test_effect||"Use Real Weather";o.querySelectorAll('input[name="test_effect"]').forEach(d=>{d.checked=d.value===c})}_render(){this.shadowRoot||this.attachShadow({mode:"open"});const s=this._config||i,o=this._hass,l=["Use Real Weather","rainy","pouring","cloudy","partlycloudy","fog","lightning","lightning-rainy","snowy","snowy-rainy","clear-night","sunny","hail"],c=n(o,["weather"],s.weather_entity),d=n(o,["sun"],s.sun_entity),u=h=>n(o,["sensor"],h),f=n(o,["input_boolean"],s.gaming_mode_entity);this.shadowRoot.innerHTML=`
        <style>
          :host { display: block; }
          .editor { padding: 16px; max-width: 560px; }
          ha-expansion-panel { margin-bottom: 8px; --expansion-panel-content-padding: 12px 16px; }
          ha-expansion-panel .content { padding: 12px 16px; }
          .section { margin-bottom: 16px; }
          .section-title { font-size: 0.9em; font-weight: 600; margin-bottom: 10px; color: var(--primary-text-color); }
          .form-row { margin-bottom: 16px; display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
          .form-row label { font-size: 14px; color: var(--secondary-text-color); min-width: 140px; }
          .entity-select, input[type="text"], input[type="number"], select {
            min-width: 220px; max-width: 100%;
            padding: 8px 12px;
            border-radius: var(--mdc-shape-small, 8px);
            border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
            background: var(--ha-card-background, var(--card-background-color));
            color: var(--primary-text-color);
            font-size: 14px;
            font-family: var(--mdc-typography-font-family, Roboto, sans-serif);
          }
          .entity-select:focus, input:focus, select:focus { outline: none; border-color: var(--primary-color); }
          input[type="number"] { min-width: 72px; width: 72px; }
          .radio-group { display: flex; flex-wrap: wrap; gap: 12px; }
          .radio-group label { min-width: auto; cursor: pointer; }
          input[type="checkbox"] { cursor: pointer; width: 18px; height: 18px; accent-color: var(--primary-color); }
        </style>
        <div class="editor">
          <ha-expansion-panel outlined>
            <h4 slot="header"><ha-icon icon="mdi:cog"></ha-icon> General</h4>
            <div class="content">
          <div class="section">
            <div class="section-title">General</div>
            <div class="form-row">
              <label><input type="checkbox" id="enabled" ${s.enabled?"checked":""}> Enable overlay</label>
            </div>
            <div class="form-row">
              <label>Weather entity</label>
              <input id="weather_entity" type="text" class="entity-select" list="weather_entity_list" value="${s.weather_entity||""}" placeholder="np. weather.openweathermap">
              <datalist id="weather_entity_list">
                ${c.map(h=>`<option value="${t(h.value)}">${t(h.label)}</option>`).join("")}
              </datalist>
            </div>
            <div class="form-row">
              <label>Sun entity</label>
              <input id="sun_entity" type="text" class="entity-select" list="sun_entity_list" value="${s.sun_entity||""}" placeholder="sun.sun">
              <datalist id="sun_entity_list">
                ${d.map(h=>`<option value="${t(h.value)}">${t(h.label)}</option>`).join("")}
              </datalist>
            </div>
          </div>
            </div>
          </ha-expansion-panel>
          <ha-expansion-panel outlined>
            <h4 slot="header"><ha-icon icon="mdi:weather-night"></ha-icon> Moon &amp; UV</h4>
            <div class="content">
          <div class="section">
            <div class="section-title">Moon &amp; UV</div>
            <div class="form-row">
              <label>Moon phase</label>
              <input id="moon_phase_entity" type="text" class="entity-select" list="moon_phase_entity_list" value="${s.moon_phase_entity||""}" placeholder="sensor.moon_phase">
              <datalist id="moon_phase_entity_list">
                ${u(s.moon_phase_entity).map(h=>`<option value="${t(h.value)}">${t(h.label)}</option>`).join("")}
              </datalist>
            </div>
            <div class="form-row">
              <label>UV index</label>
              <input id="uv_index_entity" type="text" class="entity-select" list="uv_index_entity_list" value="${s.uv_index_entity||""}" placeholder="sensor.uv_index">
              <datalist id="uv_index_entity_list">
                ${u(s.uv_index_entity).map(h=>`<option value="${t(h.value)}">${t(h.label)}</option>`).join("")}
              </datalist>
            </div>
            <div class="form-row">
              <label>Moon position (single)</label>
              <input id="moon_position_entity" type="text" class="entity-select" list="moon_position_entity_list" value="${s.moon_position_entity||""}" placeholder="sensor.moon_position">
              <datalist id="moon_position_entity_list">
                ${u(s.moon_position_entity).map(h=>`<option value="${t(h.value)}">${t(h.label)}</option>`).join("")}
              </datalist>
            </div>
            <div class="form-row"><label>Lunar Phase (3 sensors)</label></div>
            <div class="form-row">
              <label>Azimuth</label>
              <input id="moon_azimuth_entity" type="text" class="entity-select" list="moon_azimuth_entity_list" value="${s.moon_azimuth_entity||""}" placeholder="sensor.moon_azimuth">
              <datalist id="moon_azimuth_entity_list">
                ${u(s.moon_azimuth_entity).map(h=>`<option value="${t(h.value)}">${t(h.label)}</option>`).join("")}
              </datalist>
            </div>
            <div class="form-row">
              <label>Altitude</label>
              <input id="moon_altitude_entity" type="text" class="entity-select" list="moon_altitude_entity_list" value="${s.moon_altitude_entity||""}" placeholder="sensor.moon_altitude">
              <datalist id="moon_altitude_entity_list">
                ${u(s.moon_altitude_entity).map(h=>`<option value="${t(h.value)}">${t(h.label)}</option>`).join("")}
              </datalist>
            </div>
            <div class="form-row">
              <label>Distance</label>
              <input id="moon_distance_entity" type="text" class="entity-select" list="moon_distance_entity_list" value="${s.moon_distance_entity||""}" placeholder="sensor.moon_distance">
              <datalist id="moon_distance_entity_list">
                ${u(s.moon_distance_entity).map(h=>`<option value="${t(h.value)}">${t(h.label)}</option>`).join("")}
              </datalist>
            </div>
          </div>
            </div>
          </ha-expansion-panel>
          <ha-expansion-panel outlined>
            <h4 slot="header"><ha-icon icon="mdi:weather-windy"></ha-icon> Wind, clouds, precipitation</h4>
            <div class="content">
          <div class="section">
            <div class="section-title">Wind, clouds, precipitation</div>
            <div class="form-row">
              <label>Wind speed</label>
              <input id="wind_speed_entity" type="text" class="entity-select" list="wind_speed_entity_list" value="${s.wind_speed_entity||""}" placeholder="sensor.wind_speed">
              <datalist id="wind_speed_entity_list">
                ${u(s.wind_speed_entity).map(h=>`<option value="${t(h.value)}">${t(h.label)}</option>`).join("")}
              </datalist>
            </div>
            <div class="form-row">
              <label>Wind direction</label>
              <input id="wind_direction_entity" type="text" class="entity-select" list="wind_direction_entity_list" value="${s.wind_direction_entity||""}" placeholder="sensor.wind_direction">
              <datalist id="wind_direction_entity_list">
                ${u(s.wind_direction_entity).map(h=>`<option value="${t(h.value)}">${t(h.label)}</option>`).join("")}
              </datalist>
            </div>
            <div class="form-row">
              <label>Cloud coverage</label>
              <input id="cloud_coverage_entity" type="text" class="entity-select" list="cloud_coverage_entity_list" value="${s.cloud_coverage_entity||""}" placeholder="sensor.cloud_coverage">
              <datalist id="cloud_coverage_entity_list">
                ${u(s.cloud_coverage_entity).map(h=>`<option value="${t(h.value)}">${t(h.label)}</option>`).join("")}
              </datalist>
            </div>
            <div class="form-row">
              <label>Precipitation</label>
              <input id="precipitation_entity" type="text" class="entity-select" list="precipitation_entity_list" value="${s.precipitation_entity||""}" placeholder="sensor.precipitation">
              <datalist id="precipitation_entity_list">
                ${u(s.precipitation_entity).map(h=>`<option value="${t(h.value)}">${t(h.label)}</option>`).join("")}
              </datalist>
            </div>
            <div class="form-row">
              <label>Cloud speed multiplier</label>
              <input type="number" id="cloud_speed_multiplier" value="${s.cloud_speed_multiplier??1}" min="0.1" max="3" step="0.1" style="width:72px">
            </div>
            <div class="form-row">
              <label>Drizzle threshold (mm)</label>
              <input type="number" id="drizzle_precipitation_max" value="${s.drizzle_precipitation_max??2.5}" min="0" max="20" step="0.5" style="width:72px" title="Precipitation ≤ this = drizzle (light rain); above = normal rain">
            </div>
            <div class="form-row">
              <label>Wind sway factor</label>
              <input type="number" id="wind_sway_factor" value="${s.wind_sway_factor??.7}" min="0" max="2" step="0.1" style="width:72px" title="How strongly wind bends rain/snow (0 = off, 0.7 = default)">
            </div>
          </div>
            </div>
          </ha-expansion-panel>
          <ha-expansion-panel outlined>
            <h4 slot="header"><ha-icon icon="mdi:speedometer"></ha-icon> Effect speed factors (1 = default, 0.1–3)</h4>
            <div class="content">
          <div class="section">
            <div class="section-title">Effect speed factors (1 = default, 0.1–3)</div>
            <div class="form-row" style="flex-wrap:wrap;gap:8px 16px;">
              <label>Rain</label><input type="number" id="speed_factor_rain" value="${s.speed_factor_rain??1}" min="0.1" max="3" step="0.1" style="width:52px">
              <label>Snow</label><input type="number" id="speed_factor_snow" value="${s.speed_factor_snow??1}" min="0.1" max="3" step="0.1" style="width:52px">
              <label>Clouds</label><input type="number" id="speed_factor_clouds" value="${s.speed_factor_clouds??1}" min="0.1" max="3" step="0.1" style="width:52px">
              <label>Fog</label><input type="number" id="speed_factor_fog" value="${s.speed_factor_fog??1}" min="0.1" max="3" step="0.1" style="width:52px">
              <label>Smog</label><input type="number" id="speed_factor_smog" value="${s.speed_factor_smog??1}" min="0.1" max="3" step="0.1" style="width:52px">
              <label>Hail</label><input type="number" id="speed_factor_hail" value="${s.speed_factor_hail??1}" min="0.1" max="3" step="0.1" style="width:52px">
              <label>Lightning</label><input type="number" id="speed_factor_lightning" value="${s.speed_factor_lightning??1}" min="0.1" max="3" step="0.1" style="width:52px">
              <label>Stars</label><input type="number" id="speed_factor_stars" value="${s.speed_factor_stars??1}" min="0.1" max="3" step="0.1" style="width:52px">
              <label>Matrix</label><input type="number" id="speed_factor_matrix" value="${s.speed_factor_matrix??1}" min="0.1" max="3" step="0.1" style="width:52px">
            </div>
          </div>
            </div>
          </ha-expansion-panel>
          <ha-expansion-panel outlined>
            <h4 slot="header"><ha-icon icon="mdi:tune"></ha-icon> Effects enabled</h4>
            <div class="content">
          <div class="section">
            <div class="section-title">Toggle individual effects (disable heavy ones if needed)</div>
            <div class="form-row">
              <label><input type="checkbox" id="enable_rain" ${s.enable_rain!==!1?"checked":""}> Rain (rainy / pouring / lightning-rainy)</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="enable_snow" ${s.enable_snow!==!1?"checked":""}> Snow (snowy / snowy2 / snowy-rainy)</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="enable_clouds" ${s.enable_clouds!==!1?"checked":""}> Clouds</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="enable_fog" ${s.enable_fog!==!1?"checked":""}> Fog</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="enable_smog_effect" ${s.enable_smog_effect!==!1?"checked":""}> Smog alert fog</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="enable_sun_glow" ${s.enable_sun_glow!==!1?"checked":""}> Sun glow / beams</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="enable_moon_glow" ${s.enable_moon_glow!==!1?"checked":""}> Moon glow</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="enable_stars" ${s.enable_stars!==!1?"checked":""}> Stars</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="stars_require_moon" ${s.stars_require_moon?"checked":""}> Stars require moon glow</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="enable_hail" ${s.enable_hail!==!1?"checked":""}> Hail (meteors)</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="enable_lightning_effect" ${s.enable_lightning_effect!==!1?"checked":""}> Lightning flashes</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="enable_matrix" ${s.enable_matrix!==!1?"checked":""}> Matrix / gaming overlay</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="enable_window_droplets" ${s.enable_window_droplets!==!1?"checked":""}> Window droplets (side rain on glass)</label>
            </div>
          </div>
            </div>
          </ha-expansion-panel>
          <ha-expansion-panel outlined>
            <h4 slot="header"><ha-icon icon="mdi:target"></ha-icon> Spatial awareness</h4>
            <div class="content">
          <div class="section">
            <div class="section-title">Spatial awareness (where effects are drawn)</div>
            <div class="form-row">
              <label>Mode</label>
              <select id="spatial_mode" class="entity-select">
                <option value="background" ${s.spatial_mode==="background"?"selected":""}>Background (behind all cards, z-index -1)</option>
                <option value="bubble" ${s.spatial_mode==="bubble"?"selected":""}>Bubble aware (under Bubble card backdrops, z-index -3)</option>
                <option value="gradient-mask" ${s.spatial_mode==="gradient-mask"?"selected":""}>Gradient mask (effects around card edges)</option>
                <option value="foreground" ${!s.spatial_mode||s.spatial_mode==="foreground"?"selected":""}>Foreground (current behavior, above cards)</option>
              </select>
            </div>
          </div>
            </div>
          </ha-expansion-panel>
          <ha-expansion-panel outlined>
            <h4 slot="header"><ha-icon icon="mdi:snowflake"></ha-icon> Snow variant</h4>
            <div class="content">
          <div class="section">
            <div class="section-title">Snow variant</div>
            <div class="form-row">
              <label>Preferred snow style</label>
              <select id="snowy_variant" class="entity-select">
                <option value="snowy" ${s.snowy_variant==="snowy"?"selected":""}>Classic snowy (particles)</option>
                <option value="snowy2" ${!s.snowy_variant||s.snowy_variant==="snowy2"?"selected":""}>Snowy2 (layered, lighter on mobile)</option>
              </select>
            </div>
          </div>
            </div>
          </ha-expansion-panel>
          <ha-expansion-panel outlined>
            <h4 slot="header"><ha-icon icon="mdi:blur"></ha-icon> Smog (PM µg/m³ – fog above threshold)</h4>
            <div class="content">
          <div class="section">
            <div class="section-title">Smog (PM µg/m³ – fog when above threshold). Default thresholds: WHO / EPA / EU</div>
            <div class="form-row">
              <label>PM2.5</label>
              <input id="pm25_entity" type="text" class="entity-select" list="pm25_entity_list" value="${s.pm25_entity||""}" placeholder="sensor.pm25">
              <datalist id="pm25_entity_list">
                ${u(s.pm25_entity).map(h=>`<option value="${t(h.value)}">${t(h.label)}</option>`).join("")}
              </datalist>
              <label>Alert threshold (µg/m³)</label>
              <input type="number" id="smog_threshold_pm25" value="${s.smog_threshold_pm25??35}" min="1" max="500" style="width:60px" title="Default 35 (EPA: unhealthy for sensitive groups)">
            </div>
            <div class="form-row">
              <label>PM4</label>
              <input id="pm4_entity" type="text" class="entity-select" list="pm4_entity_list" value="${s.pm4_entity||""}" placeholder="sensor.pm4">
              <datalist id="pm4_entity_list">
                ${u(s.pm4_entity).map(h=>`<option value="${t(h.value)}">${t(h.label)}</option>`).join("")}
              </datalist>
              <label>Alert threshold (µg/m³)</label>
              <input type="number" id="smog_threshold_pm4" value="${s.smog_threshold_pm4??50}" min="1" max="500" style="width:60px">
            </div>
            <div class="form-row">
              <label>PM10</label>
              <input id="pm10_entity" type="text" class="entity-select" list="pm10_entity_list" value="${s.pm10_entity||""}" placeholder="sensor.pm10">
              <datalist id="pm10_entity_list">
                ${u(s.pm10_entity).map(h=>`<option value="${t(h.value)}">${t(h.label)}</option>`).join("")}
              </datalist>
              <label>Alert threshold (µg/m³)</label>
              <input type="number" id="smog_threshold_pm10" value="${s.smog_threshold_pm10??50}" min="1" max="500" style="width:60px" title="Default 50 (EU 24h limit / WHO guideline)">
            </div>
          </div>
            </div>
          </ha-expansion-panel>
          <ha-expansion-panel outlined>
            <h4 slot="header"><ha-icon icon="mdi:flash"></ha-icon> Gaming &amp; Lightning</h4>
            <div class="content">
          <div class="section">
            <div class="section-title">Gaming &amp; Lightning</div>
            <div class="form-row">
              <label>Gaming mode</label>
              <input id="gaming_mode_entity" type="text" class="entity-select" list="gaming_mode_entity_list" value="${s.gaming_mode_entity||""}" placeholder="input_boolean.gaming_mode">
              <datalist id="gaming_mode_entity_list">
                ${f.map(h=>`<option value="${t(h.value)}">${t(h.label)}</option>`).join("")}
              </datalist>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="gaming_matrix_only" ${s.gaming_matrix_only?"checked":""}> When Gaming ON: Matrix only (no weather background)</label>
            </div>
            <div class="form-row">
              <label>Lightning counter</label>
              <input id="lightning_counter_entity" type="text" class="entity-select" list="lightning_counter_entity_list" value="${s.lightning_counter_entity||""}" placeholder="sensor.lightning_counter">
              <datalist id="lightning_counter_entity_list">
                ${u(s.lightning_counter_entity).map(h=>`<option value="${t(h.value)}">${t(h.label)}</option>`).join("")}
              </datalist>
            </div>
            <div class="form-row">
              <label>Lightning distance</label>
              <input id="lightning_distance_entity" type="text" class="entity-select" list="lightning_distance_entity_list" value="${s.lightning_distance_entity||""}" placeholder="sensor.lightning_distance">
              <datalist id="lightning_distance_entity_list">
                ${u(s.lightning_distance_entity).map(h=>`<option value="${t(h.value)}">${t(h.label)}</option>`).join("")}
              </datalist>
            </div>
          </div>
            </div>
          </ha-expansion-panel>
          <ha-expansion-panel outlined>
            <h4 slot="header"><ha-icon icon="mdi:cellphone"></ha-icon> Mobile</h4>
            <div class="content">
          <div class="section">
            <div class="section-title">Mobile</div>
            <div class="form-row">
              <label><input type="checkbox" id="mobile_limit_dpr" ${s.mobile_limit_dpr?"checked":""}> Limit canvas resolution on mobile (better performance)</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="mobile_reduce_particles" ${s.mobile_reduce_particles?"checked":""}> Fewer particles (rain/snow/fog) on mobile</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="mobile_snowy2_light" ${s.mobile_snowy2_light?"checked":""}> Lighter <code>snowy2</code> snow on mobile</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="mobile_smog_simple" ${s.mobile_smog_simple?"checked":""}> Simpler smog rendering on mobile</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="mobile_30fps" ${s.mobile_30fps?"checked":""}> Limit animation to ~30 FPS on mobile</label>
            </div>
          </div>
            </div>
          </ha-expansion-panel>
          <ha-expansion-panel outlined>
            <h4 slot="header"><ha-icon icon="mdi:test-tube"></ha-icon> Development mode</h4>
            <div class="content">
          <div class="section">
            <div class="section-title">Development mode</div>
            <div class="form-row">
              <label><input type="checkbox" id="development_mode" ${s.development_mode?"checked":""}> Override real weather for testing</label>
            </div>
            ${s.development_mode?`
            <div class="form-row">
              <label>Test effect</label>
              <div class="radio-group">
                ${l.map(h=>`
                  <label><input type="radio" name="test_effect" value="${t(h)}" ${s.test_effect===h?"checked":""}> ${t(h)}</label>
                `).join("")}
              </div>
            </div>
            <div class="form-row" style="margin-top:10px;"><strong>Debug overrides</strong></div>
            <div class="form-row">
              <label>Precipitation</label>
              <select id="debug_precipitation">
                <option value="">Use sensors</option>
                <option value="light" ${s.debug_precipitation==="light"?"selected":""}>Light (~1 mm/h)</option>
                <option value="medium" ${s.debug_precipitation==="medium"?"selected":""}>Medium (~3 mm/h)</option>
                <option value="heavy" ${s.debug_precipitation==="heavy"?"selected":""}>Heavy (~8 mm/h)</option>
              </select>
            </div>
            <div class="form-row">
              <label>Wind speed</label>
              <select id="debug_wind_speed">
                <option value="">Use sensors</option>
                <option value="none" ${s.debug_wind_speed==="none"?"selected":""}>None</option>
                <option value="light" ${s.debug_wind_speed==="light"?"selected":""}>Light (~10 km/h)</option>
                <option value="medium" ${s.debug_wind_speed==="medium"?"selected":""}>Medium (~25 km/h)</option>
                <option value="strong" ${s.debug_wind_speed==="strong"?"selected":""}>Strong (~45 km/h)</option>
              </select>
            </div>
            <div class="form-row">
              <label>Wind direction</label>
              <select id="debug_wind_direction">
                <option value="">Use sensors</option>
                <option value="N" ${s.debug_wind_direction==="N"?"selected":""}>N</option>
                <option value="NE" ${s.debug_wind_direction==="NE"?"selected":""}>NE</option>
                <option value="E" ${s.debug_wind_direction==="E"?"selected":""}>E</option>
                <option value="SE" ${s.debug_wind_direction==="SE"?"selected":""}>SE</option>
                <option value="S" ${s.debug_wind_direction==="S"?"selected":""}>S</option>
                <option value="SW" ${s.debug_wind_direction==="SW"?"selected":""}>SW</option>
                <option value="W" ${s.debug_wind_direction==="W"?"selected":""}>W</option>
                <option value="NW" ${s.debug_wind_direction==="NW"?"selected":""}>NW</option>
              </select>
            </div>
            <div class="form-row">
              <label>Lightning distance (km)</label>
              <input type="number" id="debug_lightning_distance" value="${s.debug_lightning_distance??""}" placeholder="override" min="0" max="500" step="0.5" style="width:80px">
              <label>Lightning counter</label>
              <input type="number" id="debug_lightning_counter" value="${s.debug_lightning_counter??""}" placeholder="override" min="0" style="width:60px">
            </div>
            <div class="form-row">
              <label>Cloud coverage (%)</label>
              <input type="number" id="debug_cloud_coverage" value="${s.debug_cloud_coverage??""}" placeholder="0-100" min="0" max="100" style="width:80px">
            </div>
            `:""}
          </div>
            </div>
          </ha-expansion-panel>
        </div>
      `,this._attachListeners(),this._hass&&this._populateEntitySelects()}_attachListeners(){const s=this.shadowRoot;if(!s)return;const o=this._config||i,l=()=>{const d=Object.assign({},o,{enabled:s.getElementById("enabled").checked,weather_entity:s.getElementById("weather_entity").value||i.weather_entity,sun_entity:s.getElementById("sun_entity").value||i.sun_entity,moon_phase_entity:s.getElementById("moon_phase_entity").value||null,uv_index_entity:s.getElementById("uv_index_entity").value||null,moon_position_entity:s.getElementById("moon_position_entity").value||null,moon_azimuth_entity:s.getElementById("moon_azimuth_entity").value||null,moon_altitude_entity:s.getElementById("moon_altitude_entity").value||null,moon_distance_entity:s.getElementById("moon_distance_entity").value||null,gaming_mode_entity:s.getElementById("gaming_mode_entity").value||null,pm25_entity:s.getElementById("pm25_entity").value||null,pm4_entity:s.getElementById("pm4_entity").value||null,pm10_entity:s.getElementById("pm10_entity").value||null,smog_threshold_pm25:parseInt(s.getElementById("smog_threshold_pm25")?.value||"35",10)||35,smog_threshold_pm4:parseInt(s.getElementById("smog_threshold_pm4")?.value||"50",10)||50,smog_threshold_pm10:parseInt(s.getElementById("smog_threshold_pm10")?.value||"50",10)||50,cloud_coverage_entity:s.getElementById("cloud_coverage_entity")?.value||null,wind_speed_entity:s.getElementById("wind_speed_entity")?.value||null,wind_direction_entity:s.getElementById("wind_direction_entity")?.value||null,precipitation_entity:s.getElementById("precipitation_entity")?.value||null,lightning_counter_entity:s.getElementById("lightning_counter_entity")?.value||null,lightning_distance_entity:s.getElementById("lightning_distance_entity")?.value||null,debug_precipitation:s.getElementById("debug_precipitation")?.value||null,debug_wind_speed:s.getElementById("debug_wind_speed")?.value||null,debug_wind_direction:s.getElementById("debug_wind_direction")?.value||null,debug_lightning_distance:s.getElementById("debug_lightning_distance")?.value||null,debug_lightning_counter:s.getElementById("debug_lightning_counter")?.value||null,debug_cloud_coverage:s.getElementById("debug_cloud_coverage")?.value||null,cloud_speed_multiplier:parseFloat(s.getElementById("cloud_speed_multiplier")?.value||"1")||1,drizzle_precipitation_max:parseFloat(s.getElementById("drizzle_precipitation_max")?.value||"2.5")||2.5,wind_sway_factor:parseFloat(s.getElementById("wind_sway_factor")?.value||"0.7")||.7,speed_factor_rain:parseFloat(s.getElementById("speed_factor_rain")?.value||"1")||1,speed_factor_snow:parseFloat(s.getElementById("speed_factor_snow")?.value||"1")||1,speed_factor_clouds:parseFloat(s.getElementById("speed_factor_clouds")?.value||"1")||1,speed_factor_fog:parseFloat(s.getElementById("speed_factor_fog")?.value||"1")||1,speed_factor_smog:parseFloat(s.getElementById("speed_factor_smog")?.value||"1")||1,speed_factor_hail:parseFloat(s.getElementById("speed_factor_hail")?.value||"1")||1,speed_factor_lightning:parseFloat(s.getElementById("speed_factor_lightning")?.value||"1")||1,speed_factor_stars:parseFloat(s.getElementById("speed_factor_stars")?.value||"1")||1,speed_factor_matrix:parseFloat(s.getElementById("speed_factor_matrix")?.value||"1")||1,enable_rain:!!s.getElementById("enable_rain")?.checked,enable_snow:!!s.getElementById("enable_snow")?.checked,enable_clouds:!!s.getElementById("enable_clouds")?.checked,enable_fog:!!s.getElementById("enable_fog")?.checked,enable_smog_effect:!!s.getElementById("enable_smog_effect")?.checked,enable_sun_glow:!!s.getElementById("enable_sun_glow")?.checked,enable_moon_glow:!!s.getElementById("enable_moon_glow")?.checked,enable_stars:!!s.getElementById("enable_stars")?.checked,enable_hail:!!s.getElementById("enable_hail")?.checked,enable_lightning_effect:!!s.getElementById("enable_lightning_effect")?.checked,enable_matrix:!!s.getElementById("enable_matrix")?.checked,enable_window_droplets:!!s.getElementById("enable_window_droplets")?.checked,stars_require_moon:!!s.getElementById("stars_require_moon")?.checked,mobile_limit_dpr:!!s.getElementById("mobile_limit_dpr")?.checked,mobile_reduce_particles:!!s.getElementById("mobile_reduce_particles")?.checked,mobile_snowy2_light:!!s.getElementById("mobile_snowy2_light")?.checked,mobile_smog_simple:!!s.getElementById("mobile_smog_simple")?.checked,mobile_30fps:!!s.getElementById("mobile_30fps")?.checked,gaming_matrix_only:!!s.getElementById("gaming_matrix_only")?.checked,snowy_variant:s.getElementById("snowy_variant")?.value||"snowy2",spatial_mode:s.getElementById("spatial_mode")?.value||"foreground",development_mode:s.getElementById("development_mode").checked,test_effect:(s.querySelector('input[name="test_effect"]:checked')||{}).value||"Use Real Weather"});this._config=d,window.ForkUWeatherAwareConfig=d,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:d}}))};["weather_entity","sun_entity","moon_phase_entity","uv_index_entity","moon_position_entity","moon_azimuth_entity","moon_altitude_entity","moon_distance_entity","gaming_mode_entity","pm25_entity","pm4_entity","pm10_entity","smog_threshold_pm25","smog_threshold_pm4","smog_threshold_pm10","cloud_coverage_entity","wind_speed_entity","wind_direction_entity","precipitation_entity","lightning_counter_entity","lightning_distance_entity","debug_precipitation","debug_wind_speed","debug_wind_direction","debug_lightning_distance","debug_lightning_counter","debug_cloud_coverage","cloud_speed_multiplier","drizzle_precipitation_max","wind_sway_factor","speed_factor_rain","speed_factor_snow","speed_factor_clouds","speed_factor_fog","speed_factor_smog","speed_factor_hail","speed_factor_lightning","speed_factor_stars","speed_factor_matrix","snowy_variant","spatial_mode"].forEach(d=>{const u=s.getElementById(d);u&&u.addEventListener("change",l)}),["enabled","development_mode","mobile_limit_dpr","mobile_reduce_particles","mobile_snowy2_light","mobile_smog_simple","mobile_30fps","gaming_matrix_only","enable_rain","enable_snow","enable_clouds","enable_fog","enable_smog_effect","enable_sun_glow","enable_moon_glow","enable_stars","enable_hail","enable_lightning_effect","enable_matrix","enable_window_droplets","stars_require_moon"].forEach(d=>{const u=s.getElementById(d);u&&u.addEventListener("change",l)}),s.querySelectorAll('input[name="test_effect"]').forEach(d=>{d.addEventListener("change",l)})}}customElements.get("fork-u-weather-aware-card")||customElements.define("fork-u-weather-aware-card",e),customElements.get("fork-u-weather-aware-editor")||customElements.define("fork-u-weather-aware-editor",r)}()})();
