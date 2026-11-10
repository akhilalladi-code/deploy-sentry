import {describe,it,expect} from 'vitest';
import {parseRepository,statusOf,countConclusions,formatDuration} from './utils';
import type {WorkflowRun} from '../types';
const run=(status:string,conclusion:string|null=null):WorkflowRun=>({id:1,name:'Build',display_title:'Build main',head_branch:'main',head_sha:'abc123456',event:'push',status,conclusion,html_url:'https://github.com/acme/app/actions/runs/1',run_number:1,run_attempt:1,created_at:'2026-01-01T00:00:00Z',updated_at:'2026-01-01T00:01:00Z',workflow_id:10});
describe('repository parsing',()=>{
 it('parses owner/name',()=>expect(parseRepository('acme/app')).toEqual({owner:'acme',repo:'app'}));
 it('parses a standard GitHub URL',()=>expect(parseRepository('https://github.com/acme/app')).toEqual({owner:'acme',repo:'app'}));
 it('parses .git URLs',()=>expect(parseRepository('https://github.com/acme/app.git')).toEqual({owner:'acme',repo:'app'}));
 it('parses www URLs with a trailing slash',()=>expect(parseRepository('https://www.github.com/acme/app/')).toEqual({owner:'acme',repo:'app'}));
 it('parses links copied from repository tabs and subpages',()=>expect(parseRepository('https://github.com/acme/app/tree/main?tab=readme-ov-file')).toEqual({owner:'acme',repo:'app'}));
 it('parses SSH clone URLs',()=>expect(parseRepository('git@github.com:acme/app.git')).toEqual({owner:'acme',repo:'app'}));
 it('rejects non-GitHub URLs',()=>expect(parseRepository('https://example.com/acme/app')).toBeNull());
 it('rejects invalid input',()=>expect(parseRepository('bad input')).toBeNull());
});
describe('workflow helpers',()=>{
 it('normalizes conclusions',()=>expect(statusOf(run('completed','failure'))).toBe('failure'));
 it('counts outcomes',()=>expect(countConclusions([run('completed','success'),run('completed','failure'),run('in_progress')])).toEqual({success:1,failure:1,cancelled:0,active:1}));
 it('formats duration',()=>expect(formatDuration('2026-01-01T00:00:00Z','2026-01-01T00:01:15Z')).toBe('1m 15s'));
});
