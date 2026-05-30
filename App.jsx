import React, { useState } from 'react';
import { ChevronDown, Plus, Zap, Settings, Copy, Download, Eye, BarChart3, Layers } from 'lucide-react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('builder');
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [strategy, setStrategy] = useState({
    name: 'Untitled Strategy',
    indicators: [],
    conditions: [],
    risk: 2.0
  });
  const [copiedCode, setCopiedCode] = useState(false);

  const indicators = [
    { id: 'rsi', name: 'RSI', category: 'momentum', icon: '📊' },
    { id: 'macd', name: 'MACD', category: 'momentum', icon: '📈' },
    { id: 'bollinger', name: 'Bollinger Bands', category: 'volatility', icon: '🔄' },
    { id: 'ema', name: 'EMA', category: 'trend', icon: '➡️' },
    { id: 'stochastic', name: 'Stochastic', category: 'momentum', icon: '⚡' },
    { id: 'atr', name: 'ATR', category: 'volatility', icon: '📏' },
  ];

  const addIndicator = (indicator) => {
    setStrategy({
      ...strategy,
      indicators: [...strategy.indicators, { ...indicator, config: {} }]
    });
  };

  const removeIndicator = (index) => {
    setStrategy({
      ...strategy,
      indicators: strategy.indicators.filter((_, i) => i !== index)
    });
  };

  const generateCode = () => {
    return `// SHADOWS/BUILD - Auto-generated Expert Advisor
// Strategy: ${strategy.name}
// Generated: ${new Date().toLocaleDateString()}

#property strict

input double RiskPercent = ${strategy.risk};
input int MagicNumber = 20240530;

double OnTick() {
  ${strategy.indicators.map((ind, i) => `
  // ${ind.name} Signal
  double ${ind.id}_signal = Calculate${ind.name.replace(/\s+/g, '')}();`).join('\n')}

  // Entry Logic
  if (${strategy.indicators.map((_, i) => `${strategy.indicators[i].id}_signal > 0`).join(' && ')}) {
    // BUY Signal
    double risk = NormalizeDouble(AccountBalance() * RiskPercent / 100, 2);
    double lot = risk / StopLossPoints();
    BuyOrder(lot);
  }
}

void BuyOrder(double lot) {
  OrderSend(Symbol(), OP_BUY, lot, Ask, 3, Bid - StopLoss() * Point, Bid + TakeProfit() * Point, "SHADOWS/BUILD", MagicNumber, 0, Blue);
}`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-slate-800/50 backdrop-blur-lg bg-slate-950/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-500 flex items-center justify-center font-bold text-slate-950">
              ◆
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter">SHADOWS/BUILD</h1>
              <p className="text-xs text-slate-400">Expert Advisor & Indicator Studio</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">Docs</button>
            <button className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
              Deploy
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-slate-800">
          {['builder', 'preview', 'code'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-medium text-sm relative transition-colors ${
                activeTab === tab ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-emerald-500"></div>
              )}
            </button>
          ))}
        </div>

        {activeTab === 'builder' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Indicator Palette */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6 sticky top-24">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-cyan-400" />
                    Indicators
                  </h3>
                  
                  {['momentum', 'trend', 'volatility'].map((category) => (
                    <div key={category} className="mb-6">
                      <p className="text-xs font-semibold text-slate-400 uppercase mb-3">{category}</p>
                      <div className="space-y-2">
                        {indicators.filter(ind => ind.category === category).map((indicator) => (
                          <button
                            key={indicator.id}
                            onClick={() => addIndicator(indicator)}
                            className="w-full px-4 py-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 text-left text-sm font-medium transition-all hover:border-cyan-400/50 group"
                          >
                            <div className="flex items-center justify-between">
                              <span>{indicator.icon} {indicator.name}</span>
                              <Plus className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Risk Settings */}
                <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6">
                  <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-emerald-400" />
                    Risk Management
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-400">Risk Per Trade (%)</label>
                      <input
                        type="number"
                        value={strategy.risk}
                        onChange={(e) => setStrategy({ ...strategy, risk: parseFloat(e.target.value) })}
                        className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                        step="0.1"
                        min="0.1"
                        max="10"
                      />
                      <p className="text-xs text-slate-500 mt-1">Recommended: 1-3%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Builder Canvas */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-b from-slate-900/50 to-slate-900/20 backdrop-blur border border-slate-800 rounded-xl p-8 min-h-96">
                <div className="mb-8">
                  <input
                    type="text"
                    value={strategy.name}
                    onChange={(e) => setStrategy({ ...strategy, name: e.target.value })}
                    className="text-3xl font-black bg-transparent border-b-2 border-slate-700 focus:border-cyan-400 outline-none text-white w-full mb-2 transition-colors pb-2"
                  />
                  <p className="text-sm text-slate-400">Strategy name • {strategy.indicators.length} indicators</p>
                </div>

                {strategy.indicators.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <Zap className="w-12 h-12 text-slate-700 mb-4 opacity-50" />
                    <p className="text-slate-400 text-lg font-medium mb-2">No indicators yet</p>
                    <p className="text-slate-500 text-sm">Add indicators from the left panel to build your strategy</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {strategy.indicators.map((indicator, index) => (
                      <div
                        key={index}
                        className="group bg-slate-800/50 border border-slate-700 hover:border-cyan-400/50 rounded-lg p-4 transition-all hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer"
                        onClick={() => setSelectedComponent(index)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{indicator.icon}</div>
                            <div>
                              <p className="font-semibold">{indicator.name}</p>
                              <p className="text-xs text-slate-400">{indicator.category} • Configurable</p>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeIndicator(index);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 bg-red-500/20 text-red-400 text-xs rounded hover:bg-red-500/40"
                          >
                            Remove
                          </button>
                        </div>
                        {selectedComponent === index && (
                          <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-2 gap-3">
                            <input placeholder="Period" className="text-xs bg-slate-700 border border-slate-600 rounded px-2 py-1" />
                            <input placeholder="Threshold" className="text-xs bg-slate-700 border border-slate-600 rounded px-2 py-1" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                Strategy Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                  <span className="text-slate-400">Indicators</span>
                  <span className="font-bold text-cyan-400">{strategy.indicators.length}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                  <span className="text-slate-400">Risk Per Trade</span>
                  <span className="font-bold text-emerald-400">{strategy.risk.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Status</span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400">Ready to Deploy</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-400" />
                Indicators
              </h3>
              <div className="space-y-2">
                {strategy.indicators.map((ind, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                    <span className="text-sm">{ind.icon} {ind.name}</span>
                    <span className="text-xs text-slate-400">{ind.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-4">
            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Generated MQL5 Code</h3>
                <button
                  onClick={handleCopyCode}
                  className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all ${
                    copiedCode
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <Copy className="w-4 h-4" />
                  {copiedCode ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
              <pre className="bg-slate-950 rounded-lg p-4 overflow-x-auto text-sm text-slate-300 border border-slate-800">
                <code>{generateCode()}</code>
              </pre>
            </div>
            <div className="bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 rounded-xl p-6">
              <p className="text-sm text-slate-300">
                💡 <strong>Tip:</strong> Copy this code and compile it in MetaTrader 5. Customize parameters in the properties dialog before running on your account.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative border-t border-slate-800/50 backdrop-blur-lg bg-slate-950/50 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="font-bold mb-3">SHADOWS/BUILD</p>
              <p className="text-xs text-slate-500">Professional EA & Indicator Studio</p>
            </div>
            <div>
              <p className="font-bold text-sm mb-3">Platform</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Builder</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Library</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Deploy</a></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-sm mb-3">Resources</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Docs</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">API</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-sm mb-3">Legal</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
            <p>© 2024 SHADOWS/BUILD. All rights reserved. Made for professional traders.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
