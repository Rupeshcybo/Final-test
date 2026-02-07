import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { AnalysisDisplay } from './components/AnalysisDisplay';
import { AnalysisResult, AnalysisStatus, MarketIndex, TradingStrategy } from './types';
import { analyzeChartImage } from './services/geminiService';
import { UploadCloud, Loader2, AlertTriangle, Maximize2 } from './components/Icons';

const App: React.FC = () => {
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [chartImage, setChartImage] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // New States for Options Strategy
  const [market, setMarket] = useState<MarketIndex>('BANKNIFTY');
  const [strategy, setStrategy] = useState<TradingStrategy>('INTRADAY');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      processFile(event.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please upload a valid image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setChartImage(base64);
      setResult(null);
      setErrorMsg(null);
      setStatus(AnalysisStatus.IDLE);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!chartImage) return;

    try {
      setStatus(AnalysisStatus.ANALYZING);
      setErrorMsg(null);
      const data = await analyzeChartImage(chartImage, market, strategy);
      setResult(data);
      setStatus(AnalysisStatus.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to analyze chart');
      setStatus(AnalysisStatus.ERROR);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-market-dark font-sans text-slate-200 selection:bg-blue-500/30">
      <Header />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="flex flex-col gap-8">
          
          {/* Hero / Intro Section (only show if no result yet) */}
          {!result && status !== AnalysisStatus.ANALYZING && (
            <div className="text-center max-w-2xl mx-auto space-y-4 animate-fade-in mb-4">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">
                Smart Option <span className="text-blue-500">Signals</span>
              </h2>
              <p className="text-slate-400 text-base md:text-lg">
                Upload your Nifty/BankNifty chart. AI checks market news + technicals to give <span className="text-emerald-400 font-bold">CE</span> / <span className="text-rose-400 font-bold">PE</span> levels.
              </p>
            </div>
          )}

          {/* Configuration Bar */}
          <div className="w-full max-w-3xl mx-auto bg-slate-800/50 p-2 rounded-2xl flex flex-col md:flex-row gap-2 border border-slate-700">
             <div className="flex-1 grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setMarket('NIFTY')}
                  className={`py-3 rounded-xl text-sm font-bold transition-all ${market === 'NIFTY' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                >
                  NIFTY 50
                </button>
                <button 
                  onClick={() => setMarket('BANKNIFTY')}
                  className={`py-3 rounded-xl text-sm font-bold transition-all ${market === 'BANKNIFTY' ? 'bg-yellow-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                >
                  BANKNIFTY
                </button>
             </div>
             <div className="flex-1 grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setStrategy('INTRADAY')}
                  className={`py-3 rounded-xl text-sm font-bold transition-all ${strategy === 'INTRADAY' ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                >
                  Intraday
                </button>
                <button 
                  onClick={() => setStrategy('SCALPING')}
                  className={`py-3 rounded-xl text-sm font-bold transition-all ${strategy === 'SCALPING' ? 'bg-orange-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                >
                  Scalping
                </button>
             </div>
          </div>

          {/* Upload & Analysis Interface */}
          <div className={`grid grid-cols-1 ${result ? 'lg:grid-cols-12 gap-8' : 'max-w-3xl mx-auto w-full'}`}>
            
            {/* Left/Top: Image Upload Area */}
            <div className={`
              ${result ? 'lg:col-span-4' : 'w-full'} 
              transition-all duration-500 ease-in-out
            `}>
              <div 
                className={`
                  relative border-2 border-dashed border-slate-700 rounded-2xl bg-market-card/50 
                  flex flex-col items-center justify-center text-center overflow-hidden
                  group hover:border-blue-500/50 hover:bg-slate-800 transition-all cursor-pointer
                  ${chartImage ? 'aspect-auto' : 'aspect-video py-12'}
                  ${status === AnalysisStatus.ANALYZING ? 'opacity-50 pointer-events-none' : ''}
                `}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={!chartImage ? triggerFileInput : undefined}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileSelect} 
                  className="hidden" 
                  accept="image/*"
                />

                {chartImage ? (
                  <div className="relative w-full h-full group">
                     <img 
                      src={chartImage} 
                      alt="Chart Preview" 
                      className="w-full h-auto rounded-xl object-contain max-h-[500px]" 
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                      <button 
                        onClick={(e) => { e.stopPropagation(); triggerFileInput(); }}
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-medium text-sm border border-slate-500 transition-colors"
                      >
                        Change Image
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 space-y-4">
                    <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                      <UploadCloud className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white">Upload Screenshot</p>
                      <p className="text-xs text-slate-500 mt-1">TradingView or Broker Chart</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              {chartImage && status !== AnalysisStatus.SUCCESS && (
                <button
                  onClick={handleAnalyze}
                  disabled={status === AnalysisStatus.ANALYZING}
                  className={`
                    w-full mt-6 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20
                    flex items-center justify-center gap-3 transition-all transform active:scale-95
                    ${status === AnalysisStatus.ANALYZING 
                      ? 'bg-slate-800 text-slate-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white'
                    }
                  `}
                >
                  {status === AnalysisStatus.ANALYZING ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-5 h-5" />
                      Get {market} Signal
                    </>
                  )}
                </button>
              )}

               {/* Error Message */}
              {errorMsg && (
                <div className="mt-4 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-400 animate-pulse">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-medium">{errorMsg}</span>
                </div>
              )}
            </div>

            {/* Right/Bottom: Results Area */}
            {result && (
              <div className="lg:col-span-8 animate-fade-in-up">
                 <AnalysisDisplay result={result} />
                 
                 <div className="mt-8 flex justify-center">
                    <button 
                      onClick={() => {
                        setResult(null);
                        setChartImage(null);
                        setStatus(AnalysisStatus.IDLE);
                      }}
                      className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors text-sm font-bold flex items-center gap-2 border border-slate-700"
                    >
                      Analyze Another Chart
                    </button>
                 </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
