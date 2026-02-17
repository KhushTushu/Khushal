
import React, { useState } from 'react';
import { X, ArrowRight, Check } from 'lucide-react';

interface StyleQuizProps {
  onClose: () => void;
  onComplete: (prefs: string[]) => void;
}

const QUESTIONS = [
  {
    title: "Pick your primary aesthetic",
    options: ["Cyberpunk", "Y2K", "Streetwear", "Minimalist", "Grunge"]
  },
  {
    title: "Vibe for the weekend?",
    options: ["Rave/Techno", "Coffee shop", "Skate Park", "Gamer Mode", "Night out"]
  }
];

const StyleQuiz: React.FC<StyleQuizProps> = ({ onClose, onComplete }) => {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<string[]>([]);

  const handleSelect = (opt: string) => {
    const newSels = [...selections, opt];
    if (step < QUESTIONS.length - 1) {
      setSelections(newSels);
      setStep(step + 1);
    } else {
      onComplete(newSels);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-xl glass rounded-[40px] p-12 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-pink-500/20 rounded-full blur-[100px]" />
        
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full"><X /></button>

        <div className="relative space-y-8">
          <div className="space-y-2 text-center">
             <span className="text-purple-400 text-xs font-bold uppercase tracking-widest">Question {step + 1} of {QUESTIONS.length}</span>
             <h2 className="text-4xl font-display font-bold">{QUESTIONS[step].title}</h2>
          </div>

          <div className="grid gap-3">
            {QUESTIONS[step].options.map(opt => (
              <button 
                key={opt}
                onClick={() => handleSelect(opt)}
                className="group flex justify-between items-center p-6 glass border border-white/10 rounded-2xl text-left font-bold hover:bg-white hover:text-black transition-all"
              >
                {opt}
                <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-2">
            {QUESTIONS.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all ${i === step ? 'w-8 bg-purple-500' : 'w-4 bg-white/10'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleQuiz;
