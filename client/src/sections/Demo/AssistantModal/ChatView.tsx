import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, CheckCircle2 } from 'lucide-react';
import accioEmblem from '../../../assets/accio_emblem.png';

interface ChatMessage {
  id: string;
  sender: 'user' | 'accio';
  text: string;
  time: string;
  intentTag?: string;
  statusTag?: string;
}

interface ChatViewProps {
  speakText: (text: string) => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    sender: 'user',
    text: 'Check my course deadlines.',
    time: '10:42 AM',
  },
  {
    id: '2',
    sender: 'accio',
    text: 'CS101 assignment due tomorrow at 5:00 PM. Would you like me to open the rubric?',
    time: '10:42 AM',
    intentTag: 'education.deadlines',
    statusTag: 'Zero Clicks',
  },
];

const SUGGESTED_PROMPTS = [
  'Open CS101 syllabus',
  'Book appointment with Dr. Mitchell',
  'Read article aloud',
];

export const ChatView: React.FC<ChatViewProps> = ({ speakText }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const messageText = textToSend || inputValue.trim();
    if (!messageText) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = '';
      let replyIntent = 'general.automation.handler';

      const lower = messageText.toLowerCase();
      if (lower.includes('syllabus') || lower.includes('cs101') || lower.includes('course')) {
        replyText = 'Navigated to course files and opened "CS101_Syllabus.pdf". Bypassed 14 manual clicks.';
        replyIntent = 'education.document';
      } else if (lower.includes('doctor') || lower.includes('mitchell') || lower.includes('appointment')) {
        replyText = 'Connected to portal for Dr. Mitchell. Next available appointment is Thursday at 10:30 AM.';
        replyIntent = 'healthcare.schedule';
      } else if (lower.includes('read') || lower.includes('article')) {
        replyText = 'Beginning calm audio narration of the main paragraph.';
        replyIntent = 'accessibility.screen_reader';
      } else {
        replyText = `Understood: "${messageText}". Executing request hands-free.`;
        replyIntent = 'system.action.execute';
      }

      const accioMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'accio',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        intentTag: replyIntent,
        statusTag: 'Executed',
      };

      setMessages((prev) => [...prev, accioMsg]);
      setIsTyping(false);
      speakText(replyText);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[210px] p-2.5 select-none text-left">
      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 no-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-1.5 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'accio' && (
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#11261d] to-[#2d6a4f] p-0.5 shrink-0 mt-0.5">
                <img src={accioEmblem} alt="Accio" className="w-full h-full object-contain" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-lg p-1.5 space-y-0.5 text-xs ${
                msg.sender === 'user'
                  ? 'bg-[#163829] text-white rounded-tr-none'
                  : 'bg-[#f7f9f3] border border-[#dfe6d7] text-slate-800 rounded-tl-none'
              }`}
            >
              <p className="leading-snug">{msg.text}</p>
              {msg.intentTag && (
                <div className="flex items-center gap-1 text-[8px] opacity-75 font-mono">
                  <span>{msg.intentTag}</span>
                  {msg.statusTag && (
                    <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                      <CheckCircle2 className="w-2 h-2" />
                      {msg.statusTag}
                    </span>
                  )}
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5 text-[9px] font-bold">
                U
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1 text-[9px] text-slate-400 pl-6">
            <span className="w-1 h-1 rounded-full bg-[#2d6a4f] animate-bounce" />
            <span className="w-1 h-1 rounded-full bg-[#2d6a4f] animate-bounce [animation-delay:150ms]" />
            <span className="w-1 h-1 rounded-full bg-[#2d6a4f] animate-bounce [animation-delay:300ms]" />
            <span className="font-mono ml-1">Formulating...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="pt-1 pb-1 flex items-center gap-1 overflow-x-auto no-scrollbar">
        <span className="text-[8px] font-semibold uppercase tracking-wider text-slate-400 shrink-0 flex items-center gap-0.5">
          <Sparkles className="w-2 h-2 text-[#2d6a4f]" />
          Quick:
        </span>
        {SUGGESTED_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(prompt)}
            className="shrink-0 text-[9px] px-1.5 py-0.5 rounded bg-white border border-[#dfe6d7] hover:border-[#2d6a4f] text-slate-600 hover:text-accio-navy transition-colors whitespace-nowrap"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="pt-1 border-t border-[#dfe6d7] flex items-center gap-1">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Accio naturally..."
          className="flex-1 px-2.5 py-1 rounded-md bg-white border border-[#dfe6d7] text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2d6a4f] transition-all"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputValue.trim()}
          className="px-2.5 py-1 rounded-md bg-[#163829] hover:bg-[#0f281d] disabled:opacity-50 text-white text-[11px] font-semibold flex items-center gap-1 transition-all shrink-0"
        >
          <span>Send</span>
          <Send className="w-2.5 h-2.5" />
        </button>
      </div>
    </div>
  );
};
