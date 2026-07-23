import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { chatAssistantReply } from '../utils/ai';

interface Msg { id: number; from: 'user' | 'bot'; text: string; }

export function ChatWidget() {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: 0, from: 'bot', text: lang === 'bn' ? 'আসসালামু আলাইকুম! আমি সিটিজেন ভয়েস এআই সহায়ক। আপনাকে কীভাবে সাহায্য করতে পারি?' : "Hello! I'm the Citizen Voice AI Assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, open]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Msg = { id: Date.now(), from: 'user', text: input.trim() };
    const reply = chatAssistantReply(input.trim(), lang);
    setMsgs(m => [...m, userMsg, { id: Date.now() + 1, from: 'bot', text: reply }]);
    setInput('');
  };

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-bd-green text-white shadow-lg flex items-center justify-center hover:bg-bd-green-dark transition-colors"
        aria-label={t('aiAssistant')}
      >
        {open ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[92vw] max-w-sm h-[70vh] max-h-[520px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden animate-fade-up">
          <div className="bg-bd-green text-white px-4 py-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <div>
              <p className="font-semibold text-sm">{t('aiAssistant')}</p>
              <p className="text-[11px] text-emerald-100">Powered by Citizen Voice AI (Demo)</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50 dark:bg-gray-950">
            {msgs.map(m => (
              <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${
                    m.from === 'user' ? 'bg-bd-green text-white rounded-br-sm' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-700 rounded-bl-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="p-2 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder={lang === 'bn' ? 'এখানে লিখুন...' : 'Type your question...'}
              className="flex-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-bd-green"
            />
            <button onClick={send} className="p-2 rounded-lg bg-bd-green text-white hover:bg-bd-green-dark">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
