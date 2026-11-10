import type {RunStatus,WorkflowRun} from '../types';
export function statusOf(run:WorkflowRun):RunStatus{return run.status==='completed'?(run.conclusion as RunStatus|null)??'unknown':(run.status as RunStatus)??'unknown'}
export function parseRepository(input:string):{owner:string;repo:string}|null{
  const value=input.trim();
  if(!value)return null;
  let path=value;
  if(/^git@github\.com:/i.test(value))path=value.replace(/^git@github\.com:/i,'');
  else if(/^https?:\/\//i.test(value)){
    try{
      const url=new URL(value);
      if(!['github.com','www.github.com'].includes(url.hostname.toLowerCase()))return null;
      path=url.pathname;
    }catch{return null}
  }else if(/^(www\.)?github\.com\//i.test(value))path=value.replace(/^(www\.)?github\.com\//i,'');
  path=path.split(/[?#]/,1)[0].replace(/\.git$/i,'').replace(/^\/+|\/+$/g,'');
  const parts=path.split('/').filter(Boolean);
  if(parts.length<2)return null;
  const [owner,repo]=parts;
  if(!/^[\w.-]+$/.test(owner)||! /^[\w.-]+$/.test(repo))return null;
  return {owner,repo};
}
export function formatRelative(value:string):string{const date=new Date(value);if(Number.isNaN(date.getTime()))return'Unknown';const sec=Math.max(0,Math.floor((Date.now()-date.getTime())/1000));if(sec<60)return'just now';const min=Math.floor(sec/60);if(min<60)return min+'m ago';const hours=Math.floor(min/60);if(hours<24)return hours+'h ago';const days=Math.floor(hours/24);return days<30?days+'d ago':date.toLocaleDateString()}
export function formatDuration(start?:string|null,end?:string|null):string{if(!start)return'—';const a=new Date(start).getTime(),b=end?new Date(end).getTime():Date.now();if(!Number.isFinite(a)||!Number.isFinite(b)||b<a)return'—';const s=Math.floor((b-a)/1000);return s<60?s+'s':Math.floor(s/60)+'m '+s%60+'s'}
export function countConclusions(runs:WorkflowRun[]){return runs.reduce((c,r)=>{const s=statusOf(r);if(s==='success')c.success++;else if(s==='failure')c.failure++;else if(s==='cancelled')c.cancelled++;else if(['in_progress','queued','waiting','requested'].includes(s))c.active++;return c},{success:0,failure:0,cancelled:0,active:0})}
