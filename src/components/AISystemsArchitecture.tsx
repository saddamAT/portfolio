import { useState } from 'react';
import { Play, Check, AlertCircle, Loader2, Sparkles, Terminal, Code2, RefreshCw } from 'lucide-react';
import { runAgentPipelineAction } from '../actions';
import type { PipelineExecutionResult } from '../types';

export default function AISystemsArchitecture() {
  const [activeTab, setActiveTab] = useState<'python' | 'typescript'>('python');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simResult, setSimResult] = useState<PipelineExecutionResult | null>(null);
  const [simStepIndex, setSimStepIndex] = useState<number>(-1);

  const handleRunSimulation = async () => {
    setIsSimulating(true);
    setSimResult(null);
    setSimStepIndex(0);

    // Call Server Action
    const result = await runAgentPipelineAction({
      invoiceNumber: 'INV-2026-7821',
      vendor: 'Nexus Logistics Global',
      amount: 19450.0,
    });

    if (result.success && result.data) {
      // Step-by-step reveal animation
      for (let i = 0; i < result.data.steps.length; i++) {
        setSimStepIndex(i);
        await new Promise((r) => setTimeout(r, 280));
      }
      setSimResult(result.data);
    }
    setIsSimulating(false);
  };

  return (
    <section className="py-20 bg-brand-surface relative border-t border-brand-border" id="ai-architecture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700 text-cyan-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Production AI Blueprint</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-white tracking-tight leading-tight">
            Agentic AI & Evaluation Pipeline Architecture
          </h2>
          <p className="mt-4 text-slate-300 text-base">
            How I architect and govern autonomous systems in production: combining multi-agent graphs with strict
            deterministic validation, type assertions, and continuous LLM evaluation.
          </p>
        </div>

        {/* 4-Step Architecture Grid */}
        <div className="glass-card rounded-2xl p-6 sm:p-10 border border-cyan-500/30 shadow-glow-cyan/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="p-5 rounded-xl bg-brand-elevated border border-brand-border relative group hover:border-cyan-400 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs mb-3">
                01
              </div>
              <h3 className="text-base font-bold text-white">Ingestion & OCR</h3>
              <p className="text-xs text-slate-300 mt-2">
                Google Cloud Vision API (Python SDK) extracts unstructured documents into typed entity schemas.
              </p>
              <div className="mt-4 pt-3 border-t border-brand-border/60 text-[11px] font-mono text-cyan-400">
                • Zero Manual Entry
                <br />• Pre-validated payloads
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-xl bg-brand-elevated border border-cyan-500/50 relative group shadow-glow-cyan/10">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-mono font-bold text-xs mb-3">
                02
              </div>
              <h3 className="text-base font-bold text-white">Multi-Agent Router</h3>
              <p className="text-xs text-slate-300 mt-2">
                Step Agent evaluates state graph and dispatches deterministic tasks to DB or UI execution agents.
              </p>
              <div className="mt-4 pt-3 border-t border-brand-border/60 text-[11px] font-mono text-blue-400">
                • Step Agent (State graph)
                <br />• DB Agent (ORM queries)
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-xl bg-brand-elevated border border-brand-border relative group hover:border-cyan-400 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-mono font-bold text-xs mb-3">
                03
              </div>
              <h3 className="text-base font-bold text-white">WebSocket RPA</h3>
              <p className="text-xs text-slate-300 mt-2">
                Real-time bidirectional bridge dispatching automation commands to Windows desktop clients.
              </p>
              <div className="mt-4 pt-3 border-t border-brand-border/60 text-[11px] font-mono text-purple-400">
                • Zero human handoff
                <br />• Machine token auth
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-xl bg-brand-elevated border border-brand-border relative group hover:border-cyan-400 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs mb-3">
                04
              </div>
              <h3 className="text-base font-bold text-white">LLM Evals & Guardrails</h3>
              <p className="text-xs text-slate-300 mt-2">
                Automated regression eval test suites verifying agent outputs against precision thresholds before write
                operations.
              </p>
              <div className="mt-4 pt-3 border-t border-brand-border/60 text-[11px] font-mono text-emerald-400">
                • Claude Code / Codex
                <br />• basedpyright checking
              </div>
            </div>
          </div>

          {/* Interactive Live Simulation Trigger & Terminal View */}
          <div className="mt-8 pt-6 border-t border-brand-border flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Live Interactive Simulation:
              </span>
              <button
                type="button"
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono text-xs font-semibold shadow-glow-cyan transition-all disabled:opacity-50 cursor-pointer"
              >
                {isSimulating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing Pipeline Trace...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run Test Pipeline (Server Action)</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span>View Schema:</span>
              <button
                type="button"
                onClick={() => setActiveTab('python')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeTab === 'python'
                    ? 'bg-brand-elevated text-cyan-300 border border-cyan-700/60 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Python (basedpyright)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('typescript')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeTab === 'typescript'
                    ? 'bg-brand-elevated text-cyan-300 border border-cyan-700/60 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                TypeScript (Server Action)
              </button>
            </div>
          </div>

          {/* Live Simulation Execution Trace (Appears when user triggers simulation) */}
          {(isSimulating || simResult) && (
            <div className="mt-6 rounded-xl bg-slate-950 p-4 border border-cyan-500/40 font-mono text-xs text-slate-300">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="text-cyan-400 font-bold">Execution Telemetry Stream</span>
                  {isSimulating && (
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-[10px] text-cyan-300 animate-pulse border border-cyan-800">
                      DISPATCHING
                    </span>
                  )}
                  {simResult && (
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-[10px] text-emerald-300 border border-emerald-800">
                      SUCCESS · {simResult.totalLatencyMs}ms
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-500">Target: Windows RPA Bridge</span>
              </div>

              <div className="mt-3 space-y-2">
                {(simResult?.steps || [
                  { step: 1, name: 'GCV OCR Ingestion', latencyMs: 135, details: 'Extracting fields...' },
                  { step: 2, name: 'Step Agent Routing', latencyMs: 88, details: 'Evaluating state graph...' },
                  { step: 3, name: 'DB Agent Verification', latencyMs: 65, details: 'Running SQL queries...' },
                  { step: 4, name: 'WebSocket RPA Dispatch', latencyMs: 104, details: 'Connecting to Windows client...' },
                  { step: 5, name: 'Guardrail Evals', latencyMs: 43, details: 'Running regression assertions...' },
                ]).map((step, idx) => {
                  const isDone = simResult || idx <= simStepIndex;
                  const isCurrent = isSimulating && idx === simStepIndex;

                  return (
                    <div
                      key={step.step}
                      className={`flex items-start gap-3 p-2 rounded transition-colors ${
                        isCurrent
                          ? 'bg-cyan-950/40 border border-cyan-800'
                          : isDone
                          ? 'bg-slate-900/60'
                          : 'opacity-40'
                      }`}
                    >
                      <div className="mt-0.5">
                        {isDone ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : isCurrent ? (
                          <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                        ) : (
                          <span className="w-3.5 h-3.5 inline-block text-slate-600">○</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-200">
                            {step.step}. {step.name}
                          </span>
                          <span className="text-[10px] text-slate-400">{step.latencyMs}ms</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{step.details}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Interactive Agent Demo Code View */}
          <div className="mt-6 rounded-xl bg-brand-dark p-4 border border-brand-border font-mono text-xs overflow-x-auto text-slate-300">
            <div className="flex items-center justify-between pb-3 border-b border-brand-border/60 text-slate-400">
              <span className="text-cyan-400 font-semibold flex items-center gap-1.5">
                <Code2 className="w-4 h-4" />
                {activeTab === 'python'
                  ? '// Live Production Pattern: Multi-Agent Dispatch with Type Verification'
                  : '// Next.js Server Action: Deterministic Workflow Execution'}
              </span>
              <span>{activeTab === 'python' ? 'python (basedpyright)' : 'typescript (next.js)'}</span>
            </div>

            {activeTab === 'python' ? (
              <pre className="mt-3 leading-relaxed">
                <span className="text-purple-400">class</span> <span className="text-yellow-300">AgentOrchestrator</span>:
                {'\n'}    <span className="text-slate-500">"""Coordinates Step Agent, DB queries, and WebSocket RPA task dispatches."""</span>
                {'\n'}    <span className="text-purple-400">async def</span> <span className="text-blue-400">process_invoice_pipeline</span>(
                <span className="text-cyan-300">self</span>, invoice_payload: InvoiceSchema
                ) -&gt; ExecutionResult:
                {'\n'}        <span className="text-slate-500"># 1. OCR Extraction & Schema parsing via GCV Python SDK</span>
                {'\n'}        structured_data = <span className="text-purple-400">await</span> <span className="text-cyan-300">self</span>.vision_client.extract_fields(invoice_payload)
                {'\n'}
                {'\n'}        <span className="text-slate-500"># 2. Step Agent evaluation of validation rules</span>
                {'\n'}        agent_decision = <span className="text-purple-400">await</span> <span className="text-cyan-300">self</span>.step_agent.evaluate_rules(structured_data)
                {'\n'}        <span className="text-purple-400">if not</span> agent_decision.passed_evals:
                {'\n'}            <span className="text-purple-400">return</span> ExecutionResult(status=<span className="text-emerald-300">"FLAGGED_FOR_HUMAN_REVIEW"</span>)
                {'\n'}
                {'\n'}        <span className="text-slate-500"># 3. Realtime dispatch via WebSockets to RPA Client</span>
                {'\n'}        <span className="text-purple-400">await</span> <span className="text-cyan-300">self</span>.ws_rpa_bridge.dispatch_command(
                {'\n'}            task_type=<span className="text-emerald-300">"ERP_ENTRY"</span>,
                {'\n'}            data=structured_data,
                {'\n'}            auth_token=<span className="text-cyan-300">self</span>.get_m2m_token()
                {'\n'}        )
                {'\n'}        <span className="text-purple-400">return</span> ExecutionResult(status=<span className="text-emerald-300">"COMPLETED_AUTONOMOUSLY"</span>)
              </pre>
            ) : (
              <pre className="mt-3 leading-relaxed">
                <span className="text-purple-400">'use server'</span>;{'\n'}
                {'\n'}<span className="text-purple-400">export async function</span> <span className="text-blue-400">runAgentPipelineAction</span>(
                {'\n'}  params: InvoicePayload
                {'\n'}): Promise&lt;ActionResponse&lt;PipelineResult&gt;&gt; {'{'}
                {'\n'}  <span className="text-slate-500">// Static TypeScript verification & server-side validation</span>
                {'\n'}  <span className="text-purple-400">const</span> validated = InvoiceSchema.parse(params);
                {'\n'}  
                {'\n'}  <span className="text-purple-400">const</span> response = <span className="text-purple-400">await</span> orchestrator.dispatch(validated);
                {'\n'}  <span className="text-purple-400">return</span> {'{'}
                {'\n'}    success: <span className="text-blue-400">true</span>,
                {'\n'}    data: response,
                {'\n'}    executionId: response.id,
                {'\n'}  {'}'};
                {'\n'}{'}'}
              </pre>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
