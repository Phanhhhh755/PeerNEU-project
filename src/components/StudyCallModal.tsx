import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mic, 
  MicOff, 
  Video as VideoIcon, 
  VideoOff, 
  ScreenShare, 
  ShieldCheck, 
  CheckCircle2, 
  PhoneOff, 
  FileText, 
  Edit3, 
  Maximize2 
} from 'lucide-react';
import { Tutor } from '../types';

interface StudyCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutor: Tutor;
  onEndSessionAndReleaseEscrow: () => void;
}

export const StudyCallModal: React.FC<StudyCallModalProps> = ({
  isOpen,
  onClose,
  tutor,
  onEndSessionAndReleaseEscrow
}) => {
  if (!isOpen) return null;

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'video' | 'whiteboard'>('video');
  const [elapsedSeconds, setElapsedSeconds] = useState(1450); // ~24 mins in

  const [sharedNotes, setSharedNotes] = useState<string>(
    `=== NEU STUDY SESSION: ${tutor.subjects[0]?.name.toUpperCase() || 'COURSEWORK'} ===\n` +
    `Tutor: ${tutor.name} (${tutor.classCohort})\n` +
    `Student: An Minh Vu (NEU-11229011)\n\n` +
    `[KEY EXAM FRAMEWORK]:\n` +
    `1. Identify the legal/accounting issue in the case scenario.\n` +
    `2. Cite relevant statutory articles or standard journal entries.\n` +
    `3. Calculate damages / balance sheet impact:\n` +
    `   - Force Majeure requires: (a) unforeseeable event, (b) cannot be overcome, (c) direct causal link.\n` +
    `4. Conclusion & recommendations for the exam answer sheet.`
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950 flex flex-col animate-in fade-in duration-200">
      {/* Call Header Bar */}
      <div className="h-14 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-bold tracking-tight">
            Live Study Room · {tutor.name}
          </span>
          <span className="hidden sm:inline text-xs text-slate-400 font-mono">
            ({tutor.subjects[0]?.name})
          </span>
        </div>

        {/* Call Timer and Escrow Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1 rounded-lg text-xs font-mono">
            <span className="text-slate-400">Duration:</span>
            <span className="text-emerald-400 font-bold tabular-nums">{formatTimer(elapsedSeconds)}</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-lg">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Attendance Logged & Escrow Protected</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Calling Stage */}
      <div className="flex-1 relative flex flex-col md:flex-row overflow-hidden bg-slate-950 p-3 sm:p-4 gap-3">
        {/* Stage Area */}
        <div className="flex-1 relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
          {activeTab === 'video' ? (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Tutor Video Simulation */}
              <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center bg-slate-900">
                <img
                  src={tutor.avatarUrl}
                  alt={tutor.name}
                  className="w-full h-full object-contain filter contrast-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Active Speaker Badge */}
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-xs text-white px-3 py-1.5 rounded-xl border border-slate-700 text-xs flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-semibold">{tutor.name} (Tutor)</span>
                  <span className="text-slate-400 font-mono text-[11px]">Speaking...</span>
                </div>

                {/* Subtitle / Key Concept Overlay Simulation */}
                <div className="absolute bottom-6 inset-x-6 sm:inset-x-20 bg-slate-950/85 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 text-white text-xs sm:text-sm text-center shadow-lg">
                  <span className="text-emerald-400 font-bold mr-2">Tutor Insight:</span>
                  "Make sure you distinguish between void contracts under Article 122 vs voidable under Article 125 for the midterm case question."
                </div>
              </div>

              {/* Pip Student Webcam (Corner) */}
              <div className="absolute top-4 right-4 w-32 h-24 sm:w-44 sm:h-32 bg-slate-800 rounded-xl border-2 border-slate-700 overflow-hidden shadow-2xl flex items-center justify-center">
                {isVideoOn ? (
                  <div className="relative w-full h-full bg-indigo-950 flex flex-col items-center justify-center text-white">
                    <span className="text-xs font-bold">An Minh Vu</span>
                    <span className="text-[10px] text-slate-400">Class K63 · Tutee</span>
                    <span className="absolute bottom-1 right-2 text-[9px] font-mono text-emerald-400">HD 1080p</span>
                  </div>
                ) : (
                  <div className="text-slate-500 text-xs flex flex-col items-center gap-1">
                    <VideoOff className="w-5 h-5" />
                    <span>Camera Off</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Shared Interactive Whiteboard / Notepad */
            <div className="w-full h-full flex flex-col bg-white text-slate-900 p-4 overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Live Synchronized Study Scratchpad
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  ● Both participants editing
                </span>
              </div>
              <textarea
                value={sharedNotes}
                onChange={(e) => setSharedNotes(e.target.value)}
                className="flex-1 w-full p-4 font-mono text-xs sm:text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl mt-3 focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none leading-relaxed"
              />
            </div>
          )}
        </div>

        {/* Side Panel Toggles */}
        <div className="w-full md:w-80 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Study Room Tools
              </span>
              <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('video')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    activeTab === 'video' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Video
                </button>
                <button
                  onClick={() => setActiveTab('whiteboard')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    activeTab === 'whiteboard' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Notes & Board
                </button>
              </div>
            </div>

            {/* Session Info Details */}
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="text-slate-400">Course:</div>
              <div className="text-white font-bold">{tutor.subjects[0]?.name}</div>
              <div className="text-slate-400 mt-2">Tutor High Score:</div>
              <div className="text-emerald-400 font-mono font-bold">{tutor.subjects[0]?.mark}</div>
              <div className="text-slate-400 mt-2">Verified Attendance:</div>
              <div className="text-slate-300 font-mono">Room ID: neu-call-{tutor.id.slice(-4)}</div>
            </div>

            {/* Anti-Scam Assurance */}
            <div className="p-3 bg-emerald-950/40 border border-emerald-900/60 rounded-xl text-xs text-emerald-300 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Escrow Completion Trigger
              </div>
              <p className="text-[11px] text-emerald-400/90 leading-relaxed">
                When you finish your lesson, clicking "End Session & Release Escrow" authorizes the transfer to the tutor's wallet.
              </p>
            </div>
          </div>

          {/* End Call & Release Escrow CTA */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <button
              onClick={onEndSessionAndReleaseEscrow}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Complete Session & Release Escrow</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl transition-colors"
            >
              Minimize Call Window
            </button>
          </div>
        </div>
      </div>

      {/* Call Toolbar Bottom Controls */}
      <div className="h-16 bg-slate-900 border-t border-slate-800 px-6 flex items-center justify-center gap-4">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`p-3 rounded-full transition-colors ${
            isMuted ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
          }`}
          title={isMuted ? 'Unmute Mic' : 'Mute Mic'}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        <button
          onClick={() => setIsVideoOn(!isVideoOn)}
          className={`p-3 rounded-full transition-colors ${
            !isVideoOn ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
          }`}
          title={isVideoOn ? 'Turn off camera' : 'Turn on camera'}
        >
          {isVideoOn ? <VideoIcon className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </button>

        <button
          onClick={() => setIsSharingScreen(!isSharingScreen)}
          className={`p-3 rounded-full transition-colors ${
            isSharingScreen ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
          }`}
          title="Toggle Screen Share"
        >
          <ScreenShare className="w-5 h-5" />
        </button>

        <button
          onClick={() => setActiveTab(activeTab === 'video' ? 'whiteboard' : 'video')}
          className="p-3 rounded-full bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
          title="Toggle Shared Notes & Board"
        >
          <FileText className="w-5 h-5" />
        </button>

        <button
          onClick={onClose}
          className="p-3 rounded-full bg-red-600/90 hover:bg-red-700 text-white transition-colors"
          title="Leave Room"
        >
          <PhoneOff className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
