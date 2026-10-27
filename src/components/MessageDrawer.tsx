import React, { useState } from 'react';
import { X, Send, Video, FileText, CheckCheck } from 'lucide-react';
import { Tutor, Message, Conversation } from '../types';
import { Language, TRANSLATIONS } from '../utils/translations';

interface MessageDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTutor: Tutor | null;
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  onSendMessage: (conversationId: string, text: string) => void;
  onStartCall: (tutor: Tutor) => void;
  language?: Language;
}

export const MessageDrawer: React.FC<MessageDrawerProps> = ({
  isOpen,
  onClose,
  activeTutor,
  conversations,
  messages,
  onSendMessage,
  onStartCall,
  language = 'vi'
}) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[language];

  // Find active conversation
  const currentConv = conversations.find((c) => activeTutor && c.tutorId === activeTutor.id) || conversations[0];
  const convMessages = currentConv ? (messages[currentConv.id] || []) : [];

  const [inputVal, setInputVal] = useState('');

  const handleSend = () => {
    if (!inputVal.trim() || !currentConv) return;
    onSendMessage(currentConv.id, inputVal);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/40 backdrop-blur-2xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            {currentConv ? (
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-200">
                <img
                  src={currentConv.tutorAvatar}
                  alt={currentConv.tutorName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : null}
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-slate-900 truncate font-support">
                {currentConv ? currentConv.tutorName : t.chatHeader}
              </h3>
              <p className="text-[11px] text-slate-500 truncate font-medium">
                {currentConv ? currentConv.courseContext : (language === 'vi' ? 'Tư vấn học tập NEU' : 'Academic Consultation')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {activeTutor && (
              <button
                onClick={() => onStartCall(activeTutor)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-[#00528C] hover:bg-[#003B66] rounded-lg transition-colors shadow-2xs font-support"
                title={t.callButton}
              >
                <Video className="w-3.5 h-3.5" />
                <span>{t.callButton}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/40">
          <div className="text-center my-2">
            <span className="text-[11px] font-mono text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200">
              {t.verifiedChatBadge}
            </span>
          </div>

          {convMessages.map((msg) => {
            const isMe = msg.senderRole === 'tutee';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                    isMe
                      ? 'bg-[#00528C] text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-2xs'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Attachment Preview if any */}
                  {msg.attachment && (
                    <div
                      className={`mt-2 p-2 rounded-lg flex items-center gap-2 border ${
                        isMe
                          ? 'bg-slate-800/80 border-slate-700 text-slate-200'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <FileText className="w-4 h-4 shrink-0 text-[#FFC101]" />
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-medium truncate">{msg.attachment.name}</p>
                        <span className="text-[10px] text-slate-400 font-mono">{msg.attachment.size}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400 font-mono px-1">
                  <span>{msg.timestamp}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-emerald-600" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2 border-t border-slate-100 bg-white flex gap-1.5 overflow-x-auto text-[11px] text-slate-600">
          {t.quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (currentConv) onSendMessage(currentConv.id, q);
              }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-[#00528C]/8 hover:text-[#00528C] rounded-md whitespace-nowrap text-slate-700 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
          <input
            type="text"
            placeholder={t.writeMessagePlaceholder}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            className="flex-1 text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00528C]"
          />
          <button
            onClick={handleSend}
            disabled={!inputVal.trim()}
            className="p-2.5 bg-[#00528C] text-white hover:bg-[#003B66] disabled:opacity-40 rounded-xl transition-colors shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
