(function(){
window.V21=true;
const physics=courseData.find(m=>m.module==='Radiation Physics');
if(physics){
 const by=(re)=>physics.lessons.find(l=>re.test(l.title));
 const prod=by(/x-ray production|brems/i); if(prod) prod.interactive='v21-xray-production';
 const circ=by(/x-ray circuit/i); if(circ) circ.interactive='v21-circuit';
 const cath=by(/thermionic/i); if(cath) cath.interactive='v21-xray-production';
}
// Give every subject a visible mechanism-based media studio instead of a plain text-only lesson.
courseData.forEach(mod=>mod.lessons.forEach(l=>{l.v21Subject=mod.module;}));
})();
